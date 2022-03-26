import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginform!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    
    this.loginform=this.formBuilder.group({
      // email:[''],
      // password:[''],
      email:['',Validators.required],
      password:['',Validators.required],
    });
    
  }
  LoginUser(){
    this.http.get<any>("http://localhost:3000/signupuser").subscribe(res=>
                {
                  const user=res.find((data:any)=>
                              {
                                // console.log(this.loginform.value.email);
                                // console.log(this.loginform.value.password);

                                return data.email===this.loginform.value.email && data.password===this.loginform.value.password;
                              })
                  if(user)
                    { 
                      alert('Login Successfully!!');
                      this.loginform.reset();
                      this.router.navigate(['/dashboard']);
                    }
                    else
                    {
                      alert('User Not found..!!');
                    }
                }
                ,err=>{
                  alert("Something Went Wrong..!!");
                });
  }

}
