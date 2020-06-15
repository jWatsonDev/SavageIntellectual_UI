import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public title = 'login';
  loginError: boolean;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(6)]),
    reenterPassword: new FormControl('', [Validators.minLength(6)])
  });

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  // signIn() {
  //   this._authService.login('temp', 'temppw').subscribe(res => {
  //     if (res.token) {
  //       this._router.navigate(['/home']);
  //     }
  //   });
  // }

  user: User = new User();
  register() {
    console.log(this.registrationForm.value);
    this.user.username = this.registrationForm.get('username').value;
    this.user.password = this.registrationForm.get('password').value;
    this._authService.register(this.user).subscribe(d => {
      console.log('test', d)
    })
  }

  isRegistrationFormValid(): boolean {
    return this.registrationForm.valid && 
      (this.registrationForm.get('reenterPassword').value === this.registrationForm.get('password').value);
  }

  registerForm() {
    this.title = 'register';
  }

  onSubmit() {
    this._authService.login(this.loginForm.value).subscribe(res => {
      if (res.token) {
        this.loginError = false;
        this._authService.currentUser = {
          username: this.loginForm.value.username,
          token: res.token
        };
        this._router.navigate(['/home']);
        localStorage.setItem('currentUser', JSON.stringify({
          username: this.loginForm.value.username,
          token: res.token
        }));
      }
    }, error => {
      this.loginError = true;
    });
  }
}
