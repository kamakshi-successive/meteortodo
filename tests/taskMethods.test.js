import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { TaskCollection } from '../imports/db/TaskCollection';
if (Meteor.isServer) {
    describe('Tasks', () => {
      describe('methods', () => {
        const userId = Random.id();
        let taskId;
        beforeEach(()=>{
            TaskCollection.remove({});
            taskId = TaskCollection.insert({
                text: 'test Task',
                createdAt: new Date(),
                userId,
            })
        })
      });
    });
  }