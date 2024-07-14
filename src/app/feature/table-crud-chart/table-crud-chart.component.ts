import { Component } from '@angular/core';
import tableConfigJson from './tableConfig.json'
import sidebarForm from './tableForm.json' 
import { PatientService } from 'src/app/service/patient.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
 
@Component({
  selector: 'app-table-crud-chart',
  templateUrl: './table-crud-chart.component.html',
  styleUrls: ['./table-crud-chart.component.css']
})
export class TableCrudChartComponent {
  tableConfig:any=tableConfigJson
  formJson:any=sidebarForm
  tableData:any;
  editFormData:any=[];
  confimation:boolean=false;
  selectedrow: any;
  dataReady:boolean=false;

  constructor(private patientApiSerivce:PatientService, private datepipe:DatePipe, private msg: MessageService){}

  ngOnInit(): void {
      this.getAllPatientData();
  }

  getAllPatientData(){
    setTimeout(() => {
      this.patientApiSerivce.getData('patientData').subscribe(
        resp=>{
         this.tableData=resp;  
         this.dataReady=true 
        },error=>{
          console.error('API Error ==> ', error);
        }
       )      
    }, 500);
  }

  formData(e:any){
    let obj={
      id:e.id,
      patientName:e.name,
      patientMobile:e.mobileNo,
      patientGender:e.gender,
      patientDob:this.datepipe.transform(e.dob, 'dd/MM/yyyy'),
      patientEmail:e.email,
      patientInsurance:e.insuranceProvider,
      patientEmeCont:e.emergencyContact,
      patientAddress:e.address
    }
    this.dataReady=false;
    if(obj.id){
      this.patientApiSerivce.updateData('patientData', obj.id, obj).subscribe(
        resp=>{
          this.msg.add({severity:'success', summary: 'Success', detail: 'Record updated successfully'});
          this.getAllPatientData()      
        },error=>{
          console.error('API Error ==> ', error);        
        }
      )
    }else{
      delete obj.id;
      this.patientApiSerivce.postData('patientData', obj).subscribe(
        resp=>{
          this.msg.add({severity:'success', summary: 'Success', detail: 'Record add successfully'});
          this.getAllPatientData()       
        },error=>{
          console.error('API Error ==> ', error);        
        }
      )
    }
  }

  actionClick(e:any){
    if(e.name=='Edit'){
      let keysArray = Object.keys(e.rowData);
      this.patientApiSerivce.sendEditData(true);
      setTimeout(() => {
        keysArray.forEach((value, index) => 
          this.patientApiSerivce.reRenderForm(this.formJson.formControls[index], e.rowData[value], 'autofill')
        );
      }, 100);
    }else if(e.name=='Delete'){
      this.confimation=true;
      this.selectedrow=e.rowData;
    }
    
  }

  onAdd(e:any){
    this.editFormData=[]
  }

  buttonClick(e:any){
    this.confimation=false;
    if(e){
      this.patientApiSerivce.deleteData('patientData', this.selectedrow.id).subscribe(
        resp=>{
          this.dataReady=false;
          this.msg.add({severity:'success', summary: 'Success', detail: 'Record deleted successfully'});
          this.getAllPatientData()
        },error=>{
          console.error('API Error ==> ', error);          
        }
      )
    }
  }

  deleteData(rowData:any){
    this.patientApiSerivce.deleteData('patientData', rowData.id).subscribe(
      resp=>{
        console.log(resp);
        
      },error=>{
        console.error('API Error ==> ', error);          
      }
    )
  }

  bulkDelete(e:any){
    if(e.length==0){

    }else{
      e.forEach((rowData:any)=>{
        this.deleteData(rowData);
      });
        this.dataReady=false;
        this.msg.add({severity:'success', summary: 'Success', detail: 'Bulk record deleted successfully'});
        this.getAllPatientData()
    }
    
  }
}
