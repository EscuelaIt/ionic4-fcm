import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private devicesCollection: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private firebase: Firebase
  ) {
    this.devicesCollection = this.db.collection('devices');
  }

  async getToken(userId: string) {
    const token = await this.firebase.getToken();
    const newDevice = {
      token,
      userId
    };
    console.log(newDevice);
    this.devicesCollection.add(newDevice);
  }
}
