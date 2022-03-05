import { Meteor } from 'meteor/meteor';
import { startGraphQLServer } from 'meteor/quave:graphql/server';

const log = error => console.error('GraphQL server error', error);

