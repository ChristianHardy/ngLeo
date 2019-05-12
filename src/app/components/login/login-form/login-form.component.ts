import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UtilsService } from './../../../services/utils.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.status.toLowerCase() === 'invalid') {
      for (const [key, value] of Object.entries(this.loginForm.controls)) {
        if (value.status.toLowerCase() === 'invalid') {
          this.utilsService.showSnackBar(this.formErrorMessage(key, value.errors));
          break;
        }
      }
    } else {
      this.authService.login().subscribe(
        onNext => {
          this.router.navigate([environment.constants.urlApp]);
        },
        onError => {
          console.error(onError);
        }
      );
    }
  }

  formErrorMessage(name: string, errors: any): string {
    let message = ``;

    for (const [key, value] of Object.entries(errors)) {
      const values: any = value;

      switch (key) {
        case 'required':
          message = `${name} is required`;
          break;

        case 'minlength':
          message = `${name} required length is ${values.requiredLength}`;
          break;

        case 'email':
          message = `${name} must be a valid email`;
          break;
      }
    }

    return message;
  }
}
