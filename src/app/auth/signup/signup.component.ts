import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent { 
  isLoading = false;
  error?: string;
  formSent: boolean = false;
  private email_regexp_rfc5322 = /^(?:[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
  private pw_regex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('password_confirmation') password_confirmation!: ElementRef;

  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.email_regexp_rfc5322)]],
    role: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.pattern(this.pw_regex)]],
    password_confirmation: ['', [Validators.required, Validators.pattern(this.pw_regex)]],
  },  { validator: this.checkPasswords })

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService
    ){}


  onSubmit(){
    if (!this.signupForm.valid) 
      return;

    this.authService.signup(this.signupForm.value).subscribe(
      () => {
        this.formSent = true;
      },
      errorMessage => {
        this.error = "Une erreur est survenue";
      }
    )
  }

  checkField(label: string):void {
    if(!this.signupForm.controls[label].valid)
      (this as any)[label].nativeElement.style.display = 'block';
  }

  checkPasswords(control: AbstractControl) {
    let pass = control.get('password')?.value;
    let confirmPass = control.get('password_confirmation')?.value;
  
    return pass === confirmPass ? null : { notSame: true }
  }
}
