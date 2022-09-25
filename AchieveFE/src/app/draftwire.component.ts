import { Component, OnInit,ViewChild  } from '@angular/core';
import { DraftWireService } from './draftwire.service';
import { PageSettingsModel,EditSettingsModel, ToolbarItems ,DialogEditEventArgs, SaveEventArgs,FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Browser } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
//import { Interface } from 'readline';




@Component({
  selector: 'app-draftwire',
  templateUrl: './draftwire.component.html',
  styleUrls: ['./draftwire.component.scss']
})
export class DraftwireComponent implements OnInit {

  constructor(private draftwireservice:DraftWireService) { }

  public wiredata:any ;
  public editSettings: EditSettingsModel = {};
  public toolbar: ToolbarItems[] = [];
  public filterOptions: FilterSettingsModel = {};
  public editparams: Object = {};
  public wireForm: FormGroup = new FormGroup({});
  public orderData: any;
  public submitClicked: boolean = false;
  pageSettings = { pageSize: 25 };

  ngOnInit(): void {

   
   // set edit and tool bar settings for the grid
   this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
   this.toolbar = ['Edit'];  
   
   this.filterOptions = {
    type:'Menu'
   } ;

   this.editparams = { params: { popupHeight: '300px' ,
                                  popupWidth:'300px'}};
   
   // get grid data 
   this.getData()

  }

  // initialize the form shown in the popup
  createFormGroup(data): FormGroup {
    return new FormGroup({
        Account: new FormControl(data.bankAccount.accountNumber, Validators.required),
        AccountName: new FormControl(data.bankAccount.shortDisplayName,  Validators.required),
        Bank: new FormControl(data.bankAccount.bank.name,  Validators.required),
        Amount: new FormControl(data.amount,  Validators.required),
        DateIssued: new FormControl(data.cashOut.dateIssued,  Validators.required),
        DisbursementNumber: new FormControl(data.cashOut.disbursementNumber,  Validators.required),
        disbursementId: new FormControl(data.disbursementId,  Validators.required),
        payee: new FormControl(data.payee,  Validators.required),
        wireautomationId: new FormControl(data.wireAutomation==null?0:data.wireAutomation.wireAutomationId),
        wireinstructionId : new FormControl(data.customer == null? 0:data.customer.wireInstruction.wireInstructionid),
        Customer: new FormControl(data.customer == null? 0:data.customer.wireInstruction.customerid,  Validators.required),
        sendToName: new FormControl(data.customer == null?"":data.customer.wireInstruction.sendToName,  Validators.required),
        Address1: new FormControl(data.customer==null?"":data.customer.wireInstruction.address1,  Validators.required),
        Address2: new FormControl(data.customer==null?"":data.customer.wireInstruction.address2),
        City: new FormControl(data.customer==null?"":data.customer.wireInstruction.city,  Validators.required),
        State: new FormControl(data.customer==null?"":data.customer.wireInstruction.state,  Validators.required),
        Zip: new FormControl(data.customer==null?"":data.customer.wireInstruction.zipCode, Validators.required),
        ABA: new FormControl(data.customer==null?"":data.customer.wireInstruction.abaNumber,  Validators.required),
        SendToAccount: new FormControl(data.customer==null?"":data.customer.wireInstruction.accountNumber,  Validators.required),
        Reference: new FormControl(data.customer==null?"":data.customer.wireInstruction.reference),
        UpdateCustomer: new FormControl(data.UpdateCustomer==null?false:true)

    });
}

  actionBegin(args: SaveEventArgs): void {
    console.log("in action begin") ;
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        
      //this.orderData = Object.assign({}, args.rowData);
        console.log("in action begin: edit") ;
       
          this.submitClicked = false;
          // initialize the wire form
          this.wireForm = this.createFormGroup(args.rowData);
      }
      if (args.requestType === 'save') {
          this.submitClicked = true;
          if (this.wireForm.valid) {

             // reactive forms do not have two way binding
             // update the  underlying model of the row being edited with updated values from the form
       
             //create a new wireinstructions object
             let instructions = new WireInstructions({wireInstruction:{}},false,{}) ;
             this.UpdateModel(instructions,this.wireForm.value) ;
             // save changes
            this.saveData(instructions) ;

          } else {
              args.cancel = true;
          }
      }
    }
  

actionComplete(args: DialogEditEventArgs): void {
  if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
   // initialize the modal dialog
    (<Dialog>args.dialog).height = window.innerHeight  + 'px';
    //(<Dialog>args.dialog).header = "Draft wire: "  ;
    console.log((<Dialog>args.dialog).height) ;
    
    if (Browser.isDevice) {
      console.log('setting window height') ;


      //args.dialog.height = window.innerHeight - 90 + 'px';
      (<Dialog>args.dialog).height = window.innerHeight - 90 + 'px';
      (<Dialog>args.dialog).dataBind();
  }
    /* 
        console.log("in action complete") ;
    args.form.ej2_instances[0].rules = {};
   
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
          (args.form.elements.namedItem('sendToName') as HTMLInputElement).focus();
      }
       */
      
  }
  
}
 

  //get cashout data using draftwireservice
  getData(){

    // get draft wire data (cashout)

    this.draftwireservice.getDataByStatus("DISBURSED").subscribe((data:any)=>{
      this.wiredata = data ;
      
    }) ;
  }

  // save data using draftwire service
  saveData(wiredata:any){
    this.draftwireservice .postData(wiredata).subscribe((data: any) => {  
      // reload wire data
      this.getData() ;
    })  
  }

  // update wireinstruction and wireautomation with data from the form (source)
  UpdateModel(target: WireInstructions ,source?)
  {
    
    // wireinstructions
    target.customer.wireInstruction.sendToName = source.sendToName ;
    target.customer.wireInstruction.address1 = source.Address1;
    target.customer.wireInstruction.wireInstructionId = source.wireinstructionId;
    target.UpdateCustomer =  source.UpdateCustomer ;
    target.customer.wireInstruction.customerId = source.Customer ;
    target.customer.wireInstruction.address2 = source.Address2 ;
    target.customer.wireInstruction.city = source.City ;
    target.customer.wireInstruction.State = source.State ;
    target.customer.wireInstruction.zipCode = source.Zip ;
    target.customer.wireInstruction.abaNumber = source.ABA ;
    target.customer.wireInstruction.accountNumber = source.SendToAccount;

    //wireautomation
    target.wireAutomation.wireautomationId = source.wireautomationId ;
    target.wireAutomation.disbursementId = source.disbursementId ;
    target.wireAutomation.sendToName= source.sendToName ;
    target.wireAutomation.Address1 = source.Address1;
    target.wireAutomation.Address2 = source.Address2 ;
    target.wireAutomation.city= source.City
    target.wireAutomation.state = source.State ;
    target.wireAutomation.zipCode = source.Zip ;
    target.wireAutomation.abaNumber = source.ABA ;
    target.wireAutomation.accountNumber = source.SendToAccount
    target.wireAutomation.draftedOn = new Date() ;
    target.wireAutomation.draftedBy = 1003 ;

   

    // changes status to drafted
    //target.cashOut.CashOutStatusid = 1047 ;
    

  }

  // form property  getters
  get Account(): any  { return this.wireForm.get('Account'); }
  get AccountName(): any  { return this.wireForm.get('AccountName'); }
  get Bank(): any  { return this.wireForm.get('Bank'); }
  get Amount(): any  { return this.wireForm.get('Amount'); }
  get payee(): any  { return this.wireForm.get('payee'); }
  get DateIssued(): any  { return this.wireForm.get('DateIssued'); }
  get DisbursementNumber(): any  { return this.wireForm.get('DisbursementNumber'); }
  get Customer(): any  {    return this.wireForm.get('Customer'); }
  get sendToName(): any  { return this.wireForm.get('sendToName'); }
  get Address1(): any  { return this.wireForm.get('Address1'); }
  get Address2(): any  { return this.wireForm.get('Address2'); }
  get City(): any  { return this.wireForm.get('City'); }
  get State(): any  { return this.wireForm.get('State'); }
  get Zip(): any  { return this.wireForm.get('Zip'); }
  get ABA(): any  { return this.wireForm.get('ABA'); }
  get SendToAccount(): any  { return this.wireForm.get('SendToAccount'); }
  get Reference(): any  { return this.wireForm.get('Reference'); }
 get wireinstructionId(): any  { return this.wireForm.get('wireinstructionId'); }
 get disbursementId(): any  { return this.wireForm.get('disbursementId'); }
 get wireautomationId(): any  { return this.wireForm.get('wireautomationId'); }
 get UpdateCustomer(): any  { return this.wireForm.get('UpdateCustomer'); }

}
export interface Disbursement
{
  customer:{
  wireInstruction:wireInstruction

  }
  wireAutomation:wireAutomation

  UpdateCustomer:boolean

  }



  export interface wireInstruction
{
  
    wireInstructionId:number,  
    customerId:number ;
    sendToName:string ,
    address1:string,
    address2:string,
    city:string,
    state:string,
    zipCode:string,
    abaNumber:string,
    accountNumber:string
  

  }

  export interface wireAutomation
{
  
  wireautomationId:number,  
  disbursementId:number,  
    sendToName:string ,
    address1:string,
    address2:string,
    city:string,
    state:string,
    zipCode:string,
    abaNumber:string,
    accountNumber:string
    draftedOn:Date 
    draftedBy: string 
    reviewedBy:string 
    approvedOn:Date
    rejectedOn:Date
  

  }

  export class WireInstructions implements Disbursement
  {
   constructor( public customer,
    public UpdateCustomer ,public wireAutomation)
   {
     // initialize the object from params passed in the constructor 
     this.customer.wireInstruction = customer.wireInstruction;
      this.wireAutomation = wireAutomation ;
      this.UpdateCustomer = UpdateCustomer ;
   }


    
  }
  
  


 // [{"disbursementId":1902,"demandId":1818,"fundTypeId":1000,"deliveryTypeId":1001,"bankAccountid":1001,"disbursementDate":"2003-11-05T11:03:00","customerId":0,"customerNumber":"","payee":"LAW OFFICE OF RORY W CLARK","address1":"5743 CORSA AVE STE 215","address2":"","city":"WESTLAKE VILLAGE ","state":"CA","zipCode":"91362","amount":4000.0000,"reference":"ATTN: PAYOFF DEPT","cashoutId":1407,"cashOut":{"cashOutid":1407,"bankAccountid":1001,"cashOutStatusid":1002,"fundTypeid":1000,"customerId":1407,"disbursementNumber":"10100083","amount":4000.0000,"dateIssued":"2003-11-05T11:03:00","payee":"LAW OFFICE OF RORY W CLARK","registerDate":"2003-11-05T11:03:00","updateDate":null,"bankAccount":{"bankAccountid":1001,"bankid":1004,"bankAccountTypeid":1000,"shortDisplayName":"COM 937","accountNumber":"1892065937","bank":{"bankid":1004,"name":"COMERICA"}},"cashOutStatus":{"cashOutStatusid":1002,"displayName":"DISBURSED","systemName":"DISBURSED"}},"bankAccount":{"bankAccountid":1001,"bankid":1004,"bankAccountTypeid":1000,"shortDisplayName":"COM 937","accountNumber":"1892065937","bank":{"bankid":1004,"name":"COMERICA"}},"customer":null}]

