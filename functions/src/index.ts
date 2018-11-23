import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export const sendToUser = functions.https.onRequest(async (request, response) => {
  const userId = request.body.userId;
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: 'Prueba',
      body: `asdjasd alksjdaslkdj`,
      sound: 'default',
    }
  }
  const db = admin.firestore();
  const devicesRef = db.collection('devices').where('userId', '==', userId);
  const devices = await devicesRef.get();
  const tokens = [];
    devices.forEach(result => {
    const token = result.data().token;
    tokens.push( token )
  })
  await admin.messaging().sendToDevice(tokens, payload);
  response.send({rta: true});
});
