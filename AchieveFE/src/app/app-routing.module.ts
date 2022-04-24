import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home.component';
import { ContactComponent} from './contact.component';
import { ProductComponent} from './product.component';
import { OutWireComponent } from './out-wire/out-wire.component';
import {AuthGuard} from './auth.guard' ;

/* todo fix this */
/*import { ErrorComponent} from './error.component'*/
import { EmployeeComponent} from './employee.component';
import { LoginComponent } from './login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent,canActivate:[AuthGuard] },
  {path: 'employee', component: EmployeeComponent },
  {path: 'outwire', component: OutWireComponent, canActivate:[AuthGuard] },
  {path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)                           /*path location strategy */
    /*RouterModule.forRoot(appRoutes, { useHash: true }) */   /*Hashlocationstrategy */],
  exports: [RouterModule]
})
export class AppRoutingModule { }
