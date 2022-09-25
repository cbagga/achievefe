import { Component, OnInit,ViewChild  } from '@angular/core';
import { DraftWireService } from './draftwire.service';
import { PageSettingsModel,EditSettingsModel, ToolbarItems ,DialogEditEventArgs, SaveEventArgs,FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-popups';
import { Browser } from '@syncfusion/ej2-base';


@Component({
  selector: 'app-approvewire',
  templateUrl: './approvewire.component.html',
  styleUrls: ['./approvewire.component.scss']
})
export class ApprovewireComponent implements OnInit {

  constructor(private draftwireservice:DraftWireService) { }

  public wiredata:any ;
  public editSettings: EditSettingsModel = {};
  public toolbar: ToolbarItems[] = [];
  public filterOptions: FilterSettingsModel = {};
  public wireForm: FormGroup = new FormGroup({});
  public submitClicked: boolean = false;
  public editparams: Object = {};
  public disposition: Disposition[] = [] ;
  
  

  public orderData: any;
  
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

   // status array
   this.disposition  = [new Disposition(1048,"APPROVED"),new Disposition(1049,"REJECTED")] ;
   // get grid data 
   this.getData()

  }

  // initialize the form shown in the popup
  createFormGroup(data): FormGroup {
    return new FormGroup({
        Account: new FormControl(data.cashOut.bankAccount.accountNumber, Validators.required),
        AccountName: new FormControl(data.cashOut.bankAccount.shortDisplayName,  Validators.required),
        Bank: new FormControl(data.cashOut.bankAccount.bank.name,  Validators.required),
        Amount: new FormControl(data.amount,  Validators.required),
        DateIssued: new FormControl(data.cashOut.dateIssued,  Validators.required),
        DisbursementNumber: new FormControl(data.cashOut.disbursementNumber,  Validators.required),
        payee: new FormControl(data.payee,  Validators.required),
        Customer: new FormControl(data.customer==null?0:data.customer.customerId,  Validators.required),
        sendToName: new FormControl(data.wireAutomation.sendToName,  Validators.required),
        Address1: new FormControl(data.wireAutomation.address1,  Validators.required),
        Address2: new FormControl(data.wireAutomation.address2),
        City: new FormControl(data.wireAutomation.city,  Validators.required),
        State: new FormControl(data.wireAutomation.state,  Validators.required),
        Zip: new FormControl(data.wireAutomation.zipCode, Validators.required),
        ABA: new FormControl(data.wireAutomation.abaNumber,  Validators.required),
        SendToAccount: new FormControl(data.wireAutomation.accountNumber,  Validators.required),
        CashOutStatus : new FormControl(data.disposition,  Validators.required),
        
   
    });
}

  actionBegin(args: SaveEventArgs): void {
    console.log("in action begin") ;
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        this.orderData = Object.assign({}, args.rowData);
        this.submitClicked = false;
        // initialize the wire form
        this.wireForm = this.createFormGroup(args.rowData);
        
        console.log("in action begin: edit") ;
        console.log (args.target)
    }
    if (args.requestType === 'save') {
      this.submitClicked = true;
      if (this.wireForm.valid) {

         // reactive forms do not have two way binding
         // update the  underlying model of the row being edited with updated values from the form
         this.UpdateModel(args.rowData,this.wireForm.value) ;
         // save changes
        this.saveData(args.rowData) ;
        } else {
            args.cancel = true;
        }
    }
}

actionComplete(args: DialogEditEventArgs): void {
  if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
    // initialize the modal dialog
    console.log((<Dialog>args.dialog).height + "original")  ;
    (<Dialog>args.dialog).height = window.innerHeight  + 'px';
   // (<Dialog>args.dialog).height = window.innerHeight - 40 + 'px';
   // (<Dialog>args.dialog).height = window.innerHeight + 90  ;
   // (<Dialog>args.dialog).header = "Approve wire: "  ;
   
    console.log((<Dialog>args.dialog).height + "in action complete") ;
    if (Browser.isDevice) {
      console.log('setting window height') ;


      //args.dialog.height = window.innerHeight - 90 + 'px';
      (<Dialog>args.dialog).height = window.innerHeight - 90 + 'px';
      (<Dialog>args.dialog).dataBind();
  }
  }
  
}
 

  //get cashout data using draftwireservice
  getData(){

    // get draft wire data (cashout)

    this.draftwireservice.getDataByStatus("DRAFTED").subscribe((data:any)=>{
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

  UpdateModel(target?,source?)
  {
     // update wireautomation table reviewed/rejeccted/approved based on
     // disposition of the wire (approved/rejected)
     
     //todo: get logged in user id, hardcoded for now
     target.wireAutomation.reviewedBy = 1003

     if (source.CashOutStatus == "APPROVED")
     {
      
      target.wireAutomation.approvedOn = new Date() ;
     }
     else
     {
      // wire has been rejected
      target.wireAutomation.rejectedOn = new Date() ;
     }
  }

   // form property  getters
   get Account(): any  { return this.wireForm.get('Account'); }
   get AccountName(): any  { return this.wireForm.get('AccountName'); }
   get Bank(): any  { return this.wireForm.get('Bank'); }
   get Amount(): any  { return this.wireForm.get('Amount'); }
   get payee(): any  { return this.wireForm.get('payee'); }
   get DateIssued(): any  { return this.wireForm.get('DateIssued'); }
   get DisbursementNumber(): any  { return this.wireForm.get('DisbursementNumber'); }
   get Customer(): any  { return this.wireForm.get('Customer'); }
   get sendToName(): any  { return this.wireForm.get('sendToName'); }
   get Address1(): any  { return this.wireForm.get('Address1'); }
   get Address2(): any  { return this.wireForm.get('Address2'); }
   get City(): any  { return this.wireForm.get('City'); }
   get State(): any  { return this.wireForm.get('State'); }
   get Zip(): any  { return this.wireForm.get('Zip'); }
   get ABA(): any  { return this.wireForm.get('ABA'); }
   get SendToAccount(): any  { return this.wireForm.get('SendToAccount'); }
   get CashOutStatus(): any  { return this.wireForm.get('CashOutStatus'); }

}

// Disposition (status class)
export class Disposition  {
  
  public statusid?: number;
  public status?: string ;

  constructor(id:number, status:string) {
    this.statusid = id ;
    this.status = status ; 

   }
}



