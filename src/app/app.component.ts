import { Component } from '@angular/core';

import { Platform, NavController, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { FcmService } from './services/fcm.service';

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
    private toastCtrl: ToastController,
    private fcm: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenAuthState();
      this.listenToNotifications();
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

  listenToNotifications() {
    this.fcm.listenToNotifications()
    .subscribe(async (msg) => {
      console.log(msg);
      const toast = await this.toastCtrl.create({
        message: msg.body,
        duration: 3000,
        color: 'dark'
      });
      await toast.present();
    });
  }
}
