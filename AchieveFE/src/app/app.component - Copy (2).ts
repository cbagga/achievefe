import { Component } from '@angular/core';  
import {ServiceService} from './service.service';  
import { FormGroup, FormControl,Validators } from '@angular/forms'; 

@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']  
})  
export class AppComponent {  
  title = 'EmployeeFrontEnd';  
     
  constructor(private ServiceService: ServiceService) { }  
  data: any;  
  EmpForm:FormGroup = new FormGroup({});
  submitted = false;   
  EventValue: any = "Save";  
  
  ngOnInit(): void {  
    this.getdata();
  
    this.EmpForm = new FormGroup({  
      empId: new FormControl(null),  
      empName: new FormControl("",[Validators.required]),        
      empContact: new FormControl("",[Validators.required]),  
      empEmail:new FormControl("",[Validators.required]),  
      empAddress: new FormControl("",[Validators.required]),  
    })    
  }  
  getdata() {  
    this.ServiceService.getData().subscribe((data: any) => {  
      this.data = data;  
    })  
  }  
  deleteData(id) {  
    this.ServiceService.deleteData(id).subscribe((data: any) => {  
      this.data = data;  
      this.getdata();  
    })  
  }  
  Save() {   
    this.submitted = true;  
    
     if (this.EmpForm.invalid) {  
            return;  
     }  
    this.ServiceService.postData(this.EmpForm.value).subscribe((data: any) => {  
      this.data = data;  
      this.resetFrom();  
  
    })  
  }  
  Update() {   
    this.submitted = true;  
    
    if (this.EmpForm.invalid) {  
     return;  
    }        
    this.ServiceService.putData(this.EmpForm.value.empId,this.EmpForm.value).subscribe((data: any) => {  
      this.data = data;  
      this.resetFrom();  
    })  
  }  
  
  EditData(Data) {  
    this.EmpForm.controls["empId"].setValue(Data.empId);  
    this.EmpForm.controls["empName"].setValue(Data.empName);      
    this.EmpForm.controls["empContact"].setValue(Data.empContact);  
    this.EmpForm.controls["empEmail"].setValue(Data.empEmail);  
    this.EmpForm.controls["empAddress"].setValue(Data.empAddress);  
    this.EventValue = "Update";  
  }  
  
  resetFrom()  
  {     
    this.getdata();  
    this.EmpForm.reset();  
    this.EventValue = "Save";  
    this.submitted = false;   
  }  
} 
