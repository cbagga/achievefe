import { Component, OnInit,ViewChild, ViewEncapsulation  } from '@angular/core';
import { DraftWireService } from './draftwire.service';
import { PageSettingsModel,EditSettingsModel, ToolbarItems ,DialogEditEventArgs, SaveEventArgs,FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Internationalization } from '@syncfusion/ej2-base';



let instance: Internationalization = new Internationalization();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private draftwireservice:DraftWireService) { }

  public wiredata:any ;
  public editSettings: EditSettingsModel = {};
  public toolbar: ToolbarItems[] = [];
  public filterOptions: FilterSettingsModel = {};
  public orderData: any;
  public  pageSettings: PageSettingsModel ={} ; 
  @ViewChild('orderForm') public orderForm: FormGroup = new FormGroup({});
  public wireinstructions:any ;


  ngOnInit(): void {

   
  // initialize grid settings
  this.initializeGridSettings() ;
  
  // get grid data 
  this.getData()

 
  


  }

  actionBegin(args: SaveEventArgs): void {
    console.log("in action begin") ;
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        this.orderData = Object.assign({}, args.rowData);;
        console.log("in action begin: edit") ;
        console.log (args.target)
    }
    if (args.requestType === 'save') {
        if (this.orderForm.valid) {
          console.log("in action begin:save") ; 
          args.data = this.orderData;
            // save changes 
            this.saveData(this.orderData) ;
        } else {
            args.cancel = true;
        }
    }
}

actionComplete(args: DialogEditEventArgs): void {
  if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
    /* 
        console.log("in action complete") ;
    args.form.ej2_instances[0].rules = {};
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
          (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
      }
      */
  }
  
}
 
// initialize grid settings
// toolbar, page, filteroptions etc
initializeGridSettings()
{
// set edit and tool bar settings for the grid
this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
this.toolbar = ['Edit'];  
this.filterOptions = { type:'Menu'} ;
this.pageSettings = { pageSize: 25 };

}

// define columns etc for child grid
initializeChildGrid()
{
  console.log('in child grid' + this.wiredata)
  try{
    this.wireinstructions = {
    dataSource: this.wiredata,
    queryString: 'disbursementId',
   columns: [
       
        { field: 'wireAutomation.draftedBy', headerText: 'Drafted By', textAlign: 'Right', width: 100 },
        { field: 'wireAutomation.draftedOn', headerText: 'Drafted On', textAlign: 'Right', width: 100 },
        { field: 'wireAutomation.reviewedBy', headerText: 'Reviewed By', textAlign: 'Right', width: 100 },
        { field: 'wireAutomation.approvedOn', headerText: 'Approved On', textAlign: 'Right', width: 100 },
        { field: 'wireAutomation.rejectedOn', headerText: 'Rejected On', textAlign: 'Right', width: 100 },
       
       
       { field: 'wireAutomation.sendToName', headerText: 'Send To', textAlign: 'Right', width: 120 },
        
        { field: 'wireAutomation.address1', headerText: 'Address One', textAlign: 'Right', width: 120 },
        { field: 'wireAutomation.address2', headerText: 'Address Two', textAlign: 'Right', width: 120 },
        { field: 'wireAutomation.city', headerText: 'City', textAlign: 'Right', width: 120 },
        { field: 'wireAutomation.state', headerText: 'State', textAlign: 'Right', width: 120 },
        { field: 'wireAutomation.zipCode', headerText: 'Zip', textAlign: 'Right', width: 120 },
        { field: 'wireAutomation.abaNumber', headerText: 'ABA Number', textAlign: 'Right', width: 120 },
        { field: 'wireAutomation.accountNumber', headerText: 'Account Number', textAlign: 'Right', width: 120 },
       // { field: 'wireInstruction.reference', headerText: 'Reference', textAlign: 'Right', width: 120 },
   
        
        
        
    ],
  
};
  }
  catch(e:unknown)
  {
    if (typeof e==="string")
    {}else if(e instanceof Error)
    {e.message}

  }
}


  //get cashout data using draftwireservice
  getData(){

    // get draft wire data (cashout)

    this.draftwireservice.getData().subscribe((data:any)=>{
      this.wiredata = data ;

      console.log('in get data' + this.wiredata)

      // initialize the child grid
      this.initializeChildGrid() ;
      
    }) ;
  }

  // save data using draftwire service
  saveData(wiredata:any){
    this.draftwireservice .postData(wiredata).subscribe((data: any) => {  
      // reload wire data
      this.getData() ;
    })  
  }

  public format(value: Date): string {
    return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
}

}

export interface DateFormat extends Window {
  format?: Function;
}
