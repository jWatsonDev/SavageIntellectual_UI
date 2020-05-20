import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public title = 'login';
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
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
    this.user.username = 'temp';
    this.user.password = 'temppw';
    this._authService.register(this.user).subscribe(d => {
      console.log('test', d)
    })
  }

  registerForm() {
    this.title = 'register';
  }

  onSubmit() {
    this._authService.login(this.loginForm.value).subscribe(res => {
      if (res.token) {
        this._authService.currentUser = this.loginForm.value.username;
        this._router.navigate(['/home']);
        localStorage.setItem('currentUser', JSON.stringify({
          username: this.loginForm.value.username,
          token: res.token
        }));
      }
    });
    console.warn(this.loginForm.value);
  }
}
