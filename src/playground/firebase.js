import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const listener = db.ref()
  .on('value', 
      (dataSnapshot) => {
        console.log("from ON!!!", dataSnapshot.val());
      },
      (error) => {
        console.log("error fetching data", error);
      }
  );

db.ref().set({
  name: "PoorMan Malkovich",
  age: 99,
  isReal: false,
  location: {
    city: 'PDX',
    country: 'Canada'
  }
}).then(() => {    // firebase set doesn't return anything on success
  console.log('data written');
}).catch((error) => {
  console.log('error', error);
});

db.ref('age').set(88);
db.ref('location/city').set('MSP');

db.ref('attributes').set({
  height: 33,
  weight: 44
});

// set(null) === remove(). removes key, doesn't set value to null
db.ref('isReal').remove()
  .then(() => {console.log('isReal removed');})
  .catch((error) => {console.log('remove failed', error);})
  .finally(() => {console.log('regardless, all done!');});
  
db.ref().off('value', listener);

// updating attributes/weight fires 2 extra updates??? to see, comment out "off()" line above
db.ref().update({
  name: "Bob Bobson",
  age: 77,
  favoriteColor: "red no blue",
  "location/country": null,
  "attributes/weight": 55
});

db.ref()
  .once('value')
  .then((dataSnapshot) => {
    console.log("from once", dataSnapshot.val());
  })
  .catch((e) => {
    console.log("read error", e);
  });

// push() generates a unique ID, prop = key
db.ref('notes')
  .on('value', (snapshot) => {
    const notes = [];
    snapshot.forEach((n) => {
      notes.push({
        id: n.key,
        ...n.val()
      });
    });
    console.log(notes);
  });

const note1ref = db.ref('notes').push({
  title: 'note title',
  body: 'some note'
});

db.ref(note1ref).update({
  title: "note 1"
});