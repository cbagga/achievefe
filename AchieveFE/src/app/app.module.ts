import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
 
import { FormGroup, FormControl,Validators } from '@angular/forms'; 


  
import { AppComponent } from './app.component';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule }    from '@angular/common/http';  
import {ServiceService} from './service.service';  
import { HomeComponent} from './home.component' ;
import { ContactComponent} from './contact.component' ;
/*import { ErrorComponent } from './error.component';*/
import { ProductComponent} from './product.component' ;
import { EmployeeComponent } from './employee.component';
import { OutWireComponent } from './out-wire/out-wire.component';
import { BankaccountService } from './bankaccount.service';
import { OutwireService } from './outwire.service';




 
import { ProductService } from './product.service';

 
/*import { appRoutes } from './app.routes';*/


@NgModule({  
  declarations: [  
    AppComponent,HomeComponent,ContactComponent,ProductComponent,EmployeeComponent, OutWireComponent ],  
  imports: [  
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule ,
   AppRoutingModule,
   RouterModule
  
  ],  
  providers: [ServiceService,ProductService,BankaccountService,OutwireService],  
  bootstrap: [AppComponent]  
})  
export class AppModule { } 
