import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public title = 'login';

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  signIn() {
    this._authService.login('temp', 'temppw').subscribe(res => {
      if (res.token) {
        this._router.navigate(['/home']);
      }
    });
  }

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
}
