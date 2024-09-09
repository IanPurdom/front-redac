import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrl: './reset-pw.component.scss',
})
export class ResetPwComponent {
  isSent: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email =  form.value.email;

    this.authService.reset(email).subscribe(((res:any) => {
      this.isSent = true;
    }))
  }
}
