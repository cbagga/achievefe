import { Component } from '@angular/core';  
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

/**import {ServiceService} from './service.service';  
import { FormGroup, FormControl,Validators } from '@angular/forms'; **/

@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']  
})  
export class AppComponent {  
  title = 'Achieve';  
  currentUser:any ;
  constructor(
    private router:Router,
    private authenticationService: AuthService
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
     
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
} 
