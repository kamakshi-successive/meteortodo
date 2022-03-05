import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
// import { Hello } from './Hello.jsx';
// import { Info } from './Info.jsx';
import { TaskCollection } from '../db/TaskCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm';

// const tasks = [
//   {_id: 1, text: 'First Task'},
//   {_id: 2, text: 'Second Task'},
//   {_id: 3, text: 'Third Task'},
//   {_id: 4, text: 'Fourth Task'},
// ]

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  // const pendingTasksCount = useTracker(() => {
  //   if (!user) {
  //     return 0;
  //   }
  //   return TaskCollection.find(pendingOnlyFilter).count()
  // });


  // const tasks = useTracker(() => {
  //   if (!user) {
  //     return [];
  //   }
  //   return TaskCollection.find(
  //     hideCompleted ? pendingOnlyFilter : userFilter,
  //      { 
  //        sort: { createdAt: -1 } 
  //       }
  //       ).fetch();
  // });

  const toggleChecked = ({ _id, isChecked }) => {
    // TaskCollection.update(_id, {
    //   $set: {
    //     isChecked: !isChecked
    //   }
    // })
    Meteor.call('tasks.setIsChecked', _id, !isChecked);

  }
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const tasks = TaskCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 }
      }
    ).fetch();

    const pendingTasksCount = TaskCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };

  })

  const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ''
    }`
  const deleteTask = ({ _id }) => {
    // TaskCollection.remove(_id)
    Meteor.call('tasks.remove', _id)
  }
  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">

            <h1>📝️ To Do List
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>
      {/* <Hello/>
    <Info/> */}
      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm user={user} />
            {isLoading && <div className="loading">loading...</div>}
            <ul className="tasks">
              <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
              </div>
              {tasks.map((task) => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />)}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>

    </div>

  )
};
