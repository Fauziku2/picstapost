const functions = require('firebase-functions');

// const SlackWebhook = require('slack-webhook');
// const slack = new SlackWebhook('https://hooks.slack.com/services/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');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addToFollowing = functions.database.ref('/follow/{initiatorUid}/{interestedInFollowingUid}')
  .onCreate((snapshot, context) => {
    const initiatorUid = context.params.initiatorUid;
    const interestedInFollowingUid = context.params.interestedInFollowingUid;
    const rootRef = snapshot.ref.root;
    let FollowingMeRef = rootRef.child('usersFollowingMe/' + interestedInFollowingUid + '/' + initiatorUid);
    return FollowingMeRef.set(true)
  });

// exports.notifyOfUser = functions.database.ref('/users/{userId}')
//   .onCreate((snapshot, context) => {
//     const newUser = snapshot.val();
//     console.log(newUser);
//     slack.send(newUser)
//   })
