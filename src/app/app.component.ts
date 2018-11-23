import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Schedule',
      url: '/schedule',
      icon: 'home'
    },
    {
      title: 'Map',
      url: '/map',
      icon: 'list'
    },
    {
      title: 'Gallery',
      url: '/gallery',
      icon: 'list'
    },
    {
      title: 'Todos',
      url: '/todos',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenAuthState();
    });
  }

  async logout() {
    await this.auth.logout();
    this.navCtrl.navigateRoot('login');
  }

  listenAuthState() {
    this.auth.getAuthState()
    .subscribe(session => {
      console.log(session);
      let enable = false;
      if (session !== null) {
        enable = true;
        this.navCtrl.navigateRoot('schedule');
      }
      this.menuCtrl.enable(enable);
    });
  }
}
