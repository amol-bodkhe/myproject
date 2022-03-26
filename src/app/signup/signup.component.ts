import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupform!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupform=this.formBuilder.group({
      fullname:[''],
      mobile:[''],
      email:[''],
      password:[''],
    })
  }
//method SignUp() invoke for Signup  user.. 
  SignUp()
  {
this.http.post<any>("http://localhost:3000/signupuser",this.signupform.value)
.subscribe(res=>
            {
            alert('Signup Successfully!!');
            this.signupform.reset();
            this.router.navigate(['/login']);
            }
           ,err=>
           {
            alert('Something Went Wrong..!!');

           } 
          )
  }

}
