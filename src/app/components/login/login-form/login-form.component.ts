import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from './../../../services/utils.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private utilsService: UtilsService) { }

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
          console.log(key, value);
          this.utilsService.showSnackBar(this.formErrorMessage(key, value.errors));
          break;
        }
      }
    } else {
      // WS to login
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
