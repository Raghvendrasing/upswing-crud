import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import * as form  from './form.interface'
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() config: any = {};
  @Input() tableData: any[]=[];
  @Input() formJson:any = {};
  @Input() editData: any;
  @Output() onDeletechecked = new EventEmitter<any[]>();
  @Output() onAdd = new EventEmitter<string>();
  @Output() OnActionClick = new EventEmitter<any>();
  @Output() formData = new EventEmitter<any>();
  originalTableData: any;
  allSelected = false;
  formValid: boolean = false;
  rowData: any = [];
  selectedRows: any[] = [];
  visibleSidebar: any=false;
  form: FormGroup ;
  formStaticText: typeof form.FormControlTypes =form.FormControlTypes;
  formControls: form.IFormField[] = [];
  data: any = [];
  group: any = {};
  totalRecords = 0;
  pagedData: any[] = [];
  transformedData:any = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Insurance';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Patients';
  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private fb: FormBuilder, private patientSerive:PatientService){
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.originalTableData = this.tableData.map((data:any)=>({
      ...data
    }));
    this.totalRecords=this.tableData.length;
    this.setForm();
    this.patientSerive.renderNewForm.subscribe(data => {
      this.renderForm(data);
    });
    this.transformData()
  }

 transformData(): void {
    const insuranceCountMap = new Map<string, number>();

    this.originalTableData.forEach((patient:any) => {
      if (insuranceCountMap.has(patient.patientInsurance)) {
        insuranceCountMap?.set(patient?.patientInsurance, insuranceCountMap?.get(patient?.patientInsurance)! + 1);
      } else {
        insuranceCountMap.set(patient.patientInsurance, 1);
      }
    });

    this.transformedData = Array.from(insuranceCountMap, ([name, value]) => ({ name, value }));
  }
  changePage(e:any){
    console.log(e); 
  }

  ondeletechecked(){
    this.onDeletechecked.emit(this.selectedRows);
  }

  AddNewProduct(row: any) {
    this.rowData = row;
    this.visibleSidebar = true;
    this.patientSerive.sendEditData(true);
    this.onAdd.emit(this.rowData);
}

checkAll(event: any) {
  this.allSelected = event.target.ariaChecked;
  setTimeout(() => {
    if (this.allSelected) {
      this.selectedRows = [...this.tableData];
  } else {
      this.selectedRows = [];
  }
  }, 90);
}

onRowCheckboxChange(rowData: any) {
  const index = this.selectedRows.findIndex(item => item.id === rowData.id);
  if (index === -1) {
      this.selectedRows.push(rowData);
  } else {
      this.selectedRows.splice(index, 1);
  }
  this.updateCheckAllState();
}

updateCheckAllState() {
  this.allSelected = this.selectedRows.length === this.tableData.length;
}

onClick(name: any, rowData: any) {
  this.OnActionClick.emit({ name, rowData });
  if(name=='Edit'){
    this.visibleSidebar=this.patientSerive.getEditData();
  }
}

renderForm(data: any) {
  if (data.funtonality == 'autofill') {
    this.setData(data);
  }
}

setData(data: any) {
this.form.controls[data.formData.formControlName].setValue(data.value);
}

setForm() {
  if (this.editData) {
    for (const key in this.editData) {
      if (this.editData.hasOwnProperty(key)) {
        this.data.push(this.editData[key]);
      }
    }
  }
  this.formJson.formControls.forEach((control: any, i: any) => {
    let ctrl = <form.IFormField>{
      id: control.id || '',
      label: control.label || '',
      fieldName: control.formControlName || '',
      fieldType: control.type || '',
      inputType: control.inputType || '',
      placeholder: control.placeholder || '',
      editable: control.isEditable || '',
      class: control.class || '',
      lblclass: control.lblclass || '',
      valueclass: control.valueclass || '',
      message: control.message || '',
      values: control.values || '',
      validations: control.validations || '',
      visible: control.isVisible || '',
      subtype: control.subtype || '',
      icon: control.icon || '',
      isDisabled: control.isDisabled || '',
      btnLabel: control.btnLabel || '',
      fieldValue: (control.defaultValue != undefined) ? control.defaultValue : this.data[i],
      row: control.row || '',
      icons: control.icons || '',
      maxlength: control.maxlength || '',
      minlength: control.minlength || '',
      filter: control.filter || '',
    };
    this.formControls.push(ctrl);
    this.group[ctrl.fieldName] = new FormControl({ value: ctrl.fieldValue || '', disabled: !ctrl.editable });
  });
  this.formValidation();
  this.form = new FormGroup(this.group);
}

formValidation() {
  for (var field of this.formControls) {
    if (field.editable && field.validations.required && field.validations.pattern != '') {
      this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, },
        [
          Validators.required,
          Validators.pattern(field.validations.pattern)
        ]);
    } else if (field.editable && field.validations.pattern) {
      this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, },
        [
          Validators.pattern(field.validations.pattern)
        ]);
    } else if (field.editable && field.validations.required) {
      this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, },
        [
          Validators.required,
        ]);
    } else {
      this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, });
    }
  }
}

  btnClick(event:any){
    if(event.subtype=='cancel'){
      this.form.reset();
      this.visibleSidebar=false;
      this.patientSerive.sendEditData(false);
      return;
    }
    else if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.formData.emit(formData);
      this.form.reset();
      this.visibleSidebar=false;
      this.patientSerive.sendEditData(false);
    }else{
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  resetForm(){
    this.form.reset()
  }

  exportPdf() {
    const exportColumns = this.config.tableHeaders.map((config: any) => ({
      title: config.header,
      dataKey: config.field,
    }));
  
    const doc = new jsPDF('p', 'pt', 'a2');
    doc.setTextColor(0, 0, 0);
    const headerXCoordinate = doc.internal.pageSize.width / 2;
    const headerYCoordinate = 30;
    
    doc.setFontSize(15);
    doc.text('Table Data' ,headerXCoordinate, headerYCoordinate, { align: 'center' });
    (doc as any).autoTable({
      columns: exportColumns,
      body: this.tableData,
    });
    doc.save('PatientData.pdf');
  }
}
