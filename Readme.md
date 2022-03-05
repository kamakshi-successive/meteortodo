curl https://install.meteor.com/ | sh
meteor create simple-todos-react
meteor run

Hot Module Replacement

Meteor by default when using React is already adding for you a package called hot-module-replacement. This package updates the javascript modules in a running app that were modified during a rebuild. Reduces the feedback cycle while developing so you can view and test changes quicker (it even updates the app before the build has finished). You are also not going to lose the state, your app code will be updated and your state will be the same.

You should also add the package dev-error-overlay at this point so you can see the errors in your web browser.

meteor add dev-error-overlay

meteor add react-meteor-data

meteor mongo

meteor remove insecure


meteor add-platform ios
meteor run ios

meteor add-platform android
meteor run android

meteor run ios-device

meteor add meteortesting:mocha
meteor npm install --save-dev chai


TEST_WATCH=1 meteor test --driver-package meteortesting:mocha

meteor add quave:testing

meteor add quave:graphql

Server NPM packages
meteor npm install graphql-tools graphql-load graphql

Client NPM packages

meteor npm install apollo-client apollo-cache-inmemory apollo-link-error apollo-link-ddp
