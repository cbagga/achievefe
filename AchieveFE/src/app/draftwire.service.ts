import { Injectable } from '@angular/core';  
import { HttpClient,HttpHeaders }    from '@angular/common/http';  
@Injectable({  
  providedIn: 'root'  
})  
  
export class DraftWireService {  
  
constructor(private http: HttpClient) { }  
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  } 
  
  serviceURL: string = "http://localhost:5000" ;
  getData(){  
       
    return this.http.get('/api/Disbursement');  //https://localhost:44352/ webapi host url  
  }  

  // get wire data based on the status
  getDataByStatus(status:string ){  
       
    return this.http.get('/api/Disbursement/' + status);  //https://localhost:44352/ webapi host url  
  }  
  
  postData(formData){  
    return this.http.post('/api/Disbursement',formData);  
  }  
  
  putData(id: string,formData: any){  
    return this.http.put('/api/CashOut/'+id,formData);  
  }  
  deleteData(id){  
    return this.http.delete('/api/CashOut/'+id);  
  }  
    
}  

