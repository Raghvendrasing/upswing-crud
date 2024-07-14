export enum FormControlTypes {
    TEXT = "text",
    STATICTEXT = "staticText",
    SELECT = "select",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    DATE = "date",
    DATERANGE = "dateRange",
    TEXTAREA = "textarea",
    BUTTON = "button",
    MONTH = "month",
    IMAGEUPLOAD = "imageUpload",
    FILESUPLOAD = "filesUpload",
    ICON = "icon",
    DEPENDENTDROPDOWN = "dependentdropdown",
    DIVIDER = "divider",

}

export interface IFormField {
     id?:any;
    valueclass?: any;
    lblclass: any;
    label: string;
    fieldName: string;
    fieldType: string;
    inputType: string;
    fieldValue?: any;
    placeholder?: string;
    format?: string;
    editable: boolean;
    visible: boolean;
    values: any;
    class: string;
    message: any;
    validations: any;
    data: string;
    subtype: string;
    icon: any
    isDisabled: boolean
    btnLabel: any;
    row: number;
    icons: any;
    transient: any;
    limit:number;
    maxlength:any;
    minlength:any;
    isClickable:any;
    filter:any
    hourFormat:any,
    minDate:any,
    maxDate:any,
    imageQuality:any,
    tabIndex:any,
    orientation:any,
    sliderLabel:any,
    Days:any,
    acceptFilesType:any
}