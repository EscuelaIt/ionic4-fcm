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

  async getToken() {
    const token = await this.firebase.getToken();
    console.log(token);
    const newDevice = {
      token,
      userId: 123
    };
    this.devicesCollection.add(newDevice);
  }
}
