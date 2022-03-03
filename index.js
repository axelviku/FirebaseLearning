const express = require('express');
const bodyparser = require('body-parser');
var admin = require("firebase-admin");


const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

const port = 3000

var serviceAccount = require('./firebase-config.json');
var databaseURL = "https://"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
})
var notification_options = {
  priority: "high",
  collapseKey: 'watchOut',
  timeToLive: 60 * 60 * 24
};
var message_notification = {
  notification: {
    title: 'Connection_Establish',
    body: 'abc'
  }
};
// console.log(message_notification);
app.post('/firebase/notification', async function (req, res) {
  var registrationToken = ['fIPbAzklTEy2OcOcKeNwzg:APA91bELgKbu3F58QW1tdzOA8pd6gZ3ryjcMN_nKD-9tSmEATArWjHJ58RsNZfTk4yz-kzFDLahcIpca7S6dcUVkYo8Kw5A9G0z33OH2HVHRhqPe5vPAxpMr8hM0Eo_vaC8U-DQdNCZw'];
  // console.log(req.body);
  // const message = req.body.message
  const options = notification_options

  await admin.messaging().sendToDevice(registrationToken, message_notification, options)
    .then(response => {
      console.log(registrationToken, message_notification, options);
      res.status(200).send("Notification sent successfully" + JSON.stringify(response))
      console.log(JSON.stringify(response));

    })
    .catch(error => {
      console.log("hii");
      console.log(error);
    });

})


app.listen(port, () => {
  console.log("listening to port" + port)
})
