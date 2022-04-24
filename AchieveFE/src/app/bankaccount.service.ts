import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankaccountService {

  constructor(private http: HttpClient) { }  
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  } 
  
  serviceURL: string = "http://localhost:44379" ;
  getData(){  
       
    return this.http.get('/api/BankAccount');  //https://localhost:44352/ webapi host url  
  } 
  
  postData(formData){  
    return this.http.post('/api/BankAccount',formData);  
  }  
  
  putData(id: string,formData: any){  
    return this.http.put('/api/BankAccount/'+id,formData);  
  }  
  deleteData(id){  
    return this.http.delete('/api/BankAccount/'+id);  
  }  
}
