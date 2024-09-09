import { Component, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { userService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent {
  error?: string;
  user?: User;
  private email_regexp_rfc5322 = /^(?:[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
  private pw_regex = new RegExp("/\A(?=.{10,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[[:^alnum:]])/x");
  @ViewChild('email') email!: ElementRef;

  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.email_regexp_rfc5322)]],
    role: ['', [Validators.required, Validators.minLength(2)]],
    status: ['', [Validators.required, Validators.minLength(2)]],
    id: ['']
  })

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: userService,
    private route: ActivatedRoute
    ){
      this.route.params.subscribe((params) => {
        this.userService.getUser(params['id']).subscribe((res: User) => {
            this.user = res;
            this.fillForm();
          })
      })
    }

  fillForm() {
    this.signupForm.get('email')?.setValue(this.user!.email);
    this.signupForm.get('role')?.setValue(this.user!.role);
    this.signupForm.get('status')?.setValue(this.user!.status);
    this.signupForm.get('id')?.setValue(this.user!.id);
  }

  onSubmit(){
    if (!this.signupForm.valid) 
      return;

    this.userService.updateUser(this.signupForm.value).subscribe(
      () => {
        
      },
      errorMessage => {
        this.error = "Une erreur est survenue";
      }
    )
  }
  checkField(label: string):void {
    if(!this.signupForm.controls[label].valid) {
      (this as any)[label].nativeElement.style.display = 'block';
    }else{
      (this as any)[label].nativeElement.style.display = 'none';
    }
  }
}
