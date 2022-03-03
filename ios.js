var apn = require('apn');
const express = require('express');

const app = express();
const port = 3000;


app.post('/firebase/notification', async function (req, res) {
    var options = {
        token: {
            key: `${__dirname}/ios.p8`,
            keyId: "D9DM65LMKF",
            teamId: "952ZU65CH6"
        },
        // proxy: {
        //   host: "192.168.1.140",
        //   port: 8080
        // },
        production: false
    };
    var apnProvider = new apn.Provider(options);
    let deviceToken = ['chFtK1x0yUcDlU87FoQivl:APA91bHe5lCXumuIlaWDKrPsK_CxOKmecQqnzu1J6XwUfU_ev85sOh2YJNtcNk7OXd5tLph-xJVmt8ksjsEny7CCfNLnEn3-IyTezK2bt6NHWHjfd5IPkF-l9NMigTYdKLzFTN1M-7PW']
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "Watchout test";
    note.payload = { 'messageFrom': 'John Appleseed' };
    note.topic = "your-app-bundle-id";

    apnProvider.send(note, deviceToken).then((result) => {
        res.send("send succesfully " + JSON.stringify(result))
        console.log("note-------",note,"DeviceToken------",deviceToken);
    });
})
app.listen(port, () => {
    console.log("listening to port" + port)
  })
  