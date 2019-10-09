const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getUser = functions.https.onRequest((req, res) => {
  const uid = req.query.uid;
  
  if (uid) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    // res.set('Access-Control-Max-Age', '3600');
    const responseJSON = {};
    admin.database().ref(`/users/${uid}/contactInfo`).once('value')
      .then(snap => {
        console.log(`In then block: ${snap.val()}`)
        responseJSON.firstName = snap.val().firstName;
        responseJSON.lastName = snap.val().lastName;
        res.json(responseJSON);
      })
      .catch((err) => {
        res.json({ error: "Database access failed" });
        console.log("There was an error: " + err);
      })
      .finally(() => {
        console.log(responseJSON)
        res.end();
      });
  }

});
