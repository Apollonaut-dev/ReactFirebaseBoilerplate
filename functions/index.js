const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({
  origin: true
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getUser = functions.https.onRequest((req, res) => {

  console.log('Executing...');
  return cors(req, res, () => {
    const uid = req.query.uid;
    if (uid) {
      admin.database().ref(`/users/${uid}/contactInfo`).once('value')
        .then(snap => {
          console.log(`In then block: ${snap.val().toString()}`);
          let responseJSON = {
            "firstName": snap.val().firstName,
            "lastName": snap.val().lastName
          };
          res.status(200).send(JSON.stringify(responseJSON));
        })
        .catch((err) => {
          res.json({ error: "Database access failed" });
          console.log("There was an error: " + err);
        });
    }
  });
});
