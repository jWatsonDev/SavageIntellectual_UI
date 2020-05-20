import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Daily Discplines',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Add Discipline',
      url: '/add-discipline',
      icon: 'add-circle'
    },
    {
      title: 'Purpose',
      url: '/purpose',
      icon: 'information-circle'
    },
    {
      title: 'Progress',
      url: '/progress',
      icon: 'speedometer'
    },
    {
      title: 'Logout',
      url: '/',
      icon: 'log-out',
      method: 'logout'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public currentUser: User;
  public loggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.currentUser = this._authService.currentUser;
    this.loggedIn = (this.currentUser) ? true : false;

    const path = window.location.pathname.split('folder/')[1];

    if (path) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this._router.events.subscribe(e => {
      this.currentUser = this._authService.currentUser;
      this.loggedIn = (this.currentUser) ? true : false;
      // ensures active link is set to home after logging back in
      // TODO: should implement differently
      // if (this.loggedIn && e['routerEvent'] && e['routerEvent']['url'] === '/home') {
      //   this.selectedIndex = 0;
      // }
      if (this.loggedIn && e['routerEvent']) {
        this.routeUrl = e['routerEvent']['url']
        console.log(this.routeUrl)
      }
    });
  }

  routeUrl;


  menuClicked(appPage, idx) {
    this.selectedIndex = idx;
    if (appPage.method === 'logout') this.logout();
  }

  logout() {
    console.log('log out')
    this._authService.logout();
    this.currentUser = null;
    this._router.navigate(['/login']);
    this.loggedIn = false;
  }
}
