import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { AuthResponseData } from "../models/AuthResponseData";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoading = false;
  error?: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit(form: NgForm) {
    if(!form.valid) {
      
      return;
    }
    const email =  form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (resData: AuthResponseData) => {
        this.isLoading = false;
        this.router.navigate(['/articles'])
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    )

    form.reset();
  }
}