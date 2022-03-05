import { Meteor } from 'meteor/meteor';
// import { LinksCollection } from '/imports/api/links';
import { Accounts } from 'meteor/accounts-base';

import { TaskCollection } from '../imports/db/TaskCollection'
import '../imports/api/taskMethods';
import '../imports/api/tasksPublications';

// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// }

// Meteor.startup(() => {
//   // If the Links collection is empty, add some data.
//   if (LinksCollection.find().count() === 0) {
//     insertLink({
//       title: 'Do the Tutorial',
//       url: 'https://www.meteor.com/tutorials/react/creating-an-app'
//     });

//     insertLink({
//       title: 'Follow the Guide',
//       url: 'http://guide.meteor.com'
//     });

//     insertLink({
//       title: 'Read the Docs',
//       url: 'https://docs.meteor.com'
//     });

//     insertLink({
//       title: 'Discussions',
//       url: 'https://forums.meteor.com'
//     });
//   }
// });
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password'; 

const insertTask = (taskText, user) => TaskCollection.insert({ 
  text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });
  const user = Accounts.findUserByUsername(SEED_USERNAME);

Meteor.startup(() => {

if (!Accounts.findUserByUsername(SEED_USERNAME)) {
  Accounts.createUser({
    username: SEED_USERNAME,
    password: SEED_PASSWORD,
  })
}

  if (TaskCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
})