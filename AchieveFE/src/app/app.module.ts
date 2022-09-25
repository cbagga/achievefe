import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
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
import { DraftWireService } from './draftwire.service';
import { fakeBackendProvider } from './_helpers';
import { ProductService } from './product.service';
import { LoginComponent } from './login.component';
import {AuthService} from './auth.service' ;

import { MyGridComponent } from './my-grid.component';
import { DraftwireComponent } from './draftwire.component';
import { ApprovewireComponent } from './approvewire.component';
/*Imported syncfusion Grid module and services from grids package */
import { FilterService, GridModule, GroupService, PageService, SortService,EditService,ToolbarService,DetailRowService } from '@syncfusion/ej2-angular-grids';
import { DashboardComponent } from './dashboard.component';



 
/*import { appRoutes } from './app.routes';*/


@NgModule({  
  declarations: [  
    AppComponent,HomeComponent,ContactComponent,ProductComponent,EmployeeComponent, OutWireComponent, LoginComponent, MyGridComponent, 
     DraftwireComponent, ApprovewireComponent, DashboardComponent ],  
  imports: [  
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule ,
   AppRoutingModule,
   RouterModule,
  GridModule
  
  ],  
  providers: [ServiceService,ProductService,BankaccountService,OutwireService,fakeBackendProvider,AuthService,FilterService,
    PageService,SortService,GroupService,ToolbarService, EditService,DraftWireService,DetailRowService ],
  bootstrap: [AppComponent]  
})  
export class AppModule { } 
