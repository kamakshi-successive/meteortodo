import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { TaskCollection } from '../imports/db/TaskCollection';
import '../imports/api/taskMethods';

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                TaskCollection.remove({});
                taskId = TaskCollection.insert({
                    text: 'Test Task',
                    createdAt: new Date(),
                    userId,
                });
            });

            it('Can delete owned task', () => {
                mockMethodCall('tasks.remove', taskId, { context: { userId } });
                assert.equal(TaskCollection.find().count(), 0);
            });

            it('cant delete task without an user authicated', () => {
                const fn = () => mockMethodCall('tasks.remove', taskId);
                assert.throw(fn, /Not authorized/);
                assert.equal(TaskCollection.find().count(), 1);
            })

            it('can change the status of a task', () => {
                const originalTask = TaskCollection.findOne(taskId);
                mockMethodCall('tasks.setIsChecked', taskId, !originalTask.isChecked, {
                    context: { userId },
                })
                const updatedTask = TaskCollection.findOne(taskId);
                assert.notEqual(updatedTask.isChecked, originalTask.isChecked);
            })

            it('Can insert New Tasks', () => {
                const text = 'New Task';
                mockMethodCall('tasks.insert', text, {
                    context: { userId },
                })
                const tasks = TaskCollection.find({}).fetch();
                assert.equal(tasks.length, 2);
                assert.isTrue(tasks.some(task => task.text === text));
            })

        })
    })
}