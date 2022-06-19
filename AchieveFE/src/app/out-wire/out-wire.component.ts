import { Component, OnInit } from '@angular/core';
import { BankaccountService } from '../bankaccount.service'; 
import { OutwireService } from '../outwire.service';
import { FormGroup, FormControl,Validators } from '@angular/forms'; 
import { ForwardRefHandling } from '@angular/compiler';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-out-wire',
  templateUrl: './out-wire.component.html',
  styleUrls: ['./out-wire.component.scss']
})
export class OutWireComponent implements OnInit {

  constructor(private baservice:BankaccountService,private outwireservice:OutwireService) { }

  EventValue: string  = "Save";  
  submitted = false; 
  outwireform:FormGroup = new FormGroup({});
  bankdata:any ;
  outwiredata:any ;
  wiredata:any ;
  today = this.getCurrentDate(new Date()) ;
  pageSettings = { pageSize: 10 };

  ngOnInit(): void {

    
    /**get bankaccounts */
    this.getdata() ;
    
    /* get wires sent today */
    this.getwiredata("1") ;
   
   
    /** set the outgoing wire form  controls */
    /* set the formgroup and the controls which will be bound to the HTML template*/
   this.outwireform = new FormGroup({  
      id: new FormControl(null),
      bankaccountid: new FormControl(null),  
      recipientname: new FormControl("name",[Validators.required]),        
      recipientaddress: new FormControl("address",[Validators.required]), 
      recipientcity:new FormControl("",[Validators.required]),
      recipientstate:new FormControl("CA",[Validators.required]),
      recipientzip:new FormControl("91362",[Validators.required]),
      recipientaccount:new FormControl("12222",[Validators.required]),
      recipientroutingnumber:new FormControl("ABA12344",[Validators.required]),
      amount: new FormControl("100") ,
      wiredate:new FormControl("03/13/1966",[Validators.required]) ,
  
      
         
    }) 
  
  }

  /** get bankaccounts */
  getdata() {  
   console.log("in get data") ;
    this.baservice.getData().subscribe((data: any) => {  
      console.log("getting bank data") ;
     
      this.bankdata = data;  
      console.log(this.bankdata) ;
    })  
    console.log("show it again" + this.bankdata) ;
  }  

  getwiredata(wiredate:any) {  
    console.log("in get data") ;
     this.outwireservice.getDataByWireDate(wiredate).subscribe((data: any) => {  
       console.log("getting bank data") ;
      
       this.outwiredata = data;  
       console.log(this.outwiredata) ;
     })  
     console.log("show it again" + this.bankdata) ;
   }  

   Save(){
    /* post the data to save the outgoing wire info*/
   let bankaccountidnumeric :number ;
   let wiredateDate:any ;

    this.submitted = true;  
    
    if (this.outwireform.invalid) {  
           return;  
    }  
   
    /* convert bank account to number*/
    bankaccountidnumeric = Number(this.outwireform.get("bankaccountid")?.value);
    /* convert date string to date */
    wiredateDate = new Date(this.outwireform.get("wiredate")?.value) ;

    /* update the formcontrol with the numeric bankaccountid*/
    this.outwireform.get("bankaccountid")?.patchValue(bankaccountidnumeric) ;
    /* update formcontrol wiredate with date type*/
    this.outwireform.get("wiredate")?.patchValue(wiredateDate) ;
    
    this.outwireservice.postData(this.outwireform.value).subscribe((data: any) => {  
     this.outwiredata = data;  
     this.resetForm();  
     /* reload sent wires for today*/
     this.getwiredata(new Date()) ;
 
   })  
  }

  resetForm()  
  {     
    this.getdata();  
    this.outwireform.reset();  
    this.EventValue = "Save";  
    this.submitted = false;   
  }  

  getCurrentDate(fulldate:Date):string
  {
      /* get month, day, and year from the passed in date and time and return as a string */
      let mnth:String = (fulldate.getUTCMonth() + 1).toString() ;
      let day:string = fulldate.getDate().toString() ;
      let year:string = fulldate.getFullYear().toString() ;

      return mnth + "/" + day +"/" +  year ;

  }
}
