import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OutwireService {

  constructor(private http: HttpClient) { }  
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  } 
  
  serviceURL: string = "http://localhost:5000" ;
  getData(){  
       
    return this.http.get('/api/OutWire');  //https://localhost:44352/ webapi host url  
  }  
  
 getDataByWireDate(wiredate)
 {
   /* create a query string param of the wire date*/
  /* let queryparams = new HttpParams() ;

   queryparams = queryparams.append("wiredate",wiredate)  */

  return this.http.get('/api/OutWire/' + wiredate);
 }
 
 
 postData(formData){  
    return this.http.post('/api/OutWire',formData);  
  }  
  
  putData(id: string,formData: any){  
    return this.http.put('/api/OutWire/'+id,formData);  
  }  
  deleteData(id){  
    return this.http.delete('/api/OutWire/'+id);  
  }  

}
