import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public auth: Auth,private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
      
  }

  onSubmit() {
   createUserWithEmailAndPassword(this.auth, this.loginForm.value.email, this.loginForm.value.password)
   .then((response: any) => {
    this.router.navigate(['/planner'])
    })
    .catch((error: any) => {
      console.log(error);
    });
   
 }

}
