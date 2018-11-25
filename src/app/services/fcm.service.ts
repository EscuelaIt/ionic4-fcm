import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private devicesCollection: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private firebase: Firebase,
    private platform: Platform
  ) {
    this.devicesCollection = this.db.collection('devices');
  }

  async getToken(userId: string) {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    if (!this.platform.is('cordova')) {
      // web push
    }

    this.registerToken(token, userId);
  }

  registerToken(token, userId) {
    if (!token) {
      return;
    }
    const newDevice = {
      token,
      userId
    };
    this.devicesCollection.add(newDevice);
  }

  listenToNotifications() {
    return this.firebase.onNotificationOpen();
  }
}
