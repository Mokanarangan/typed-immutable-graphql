

import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      id : {
        type: GraphQLString,
      },
      type : {
        type: GraphQLString,
      }
  }
});

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
      id : {
        type: GraphQLString,
      },
      name : {
        type: GraphQLString,
      },
      tickets : {
        type: new GraphQLList(TicketType),
      }
  }
});

const ProjectType = new GraphQLObjectType({
  name: 'ProjectType',
  fields: {
      id : {
        type: GraphQLInt,
      },
      type : {
        type: GraphQLString,
      },
      tickets : {
        type: new GraphQLNonNull(new GraphQLList(MemberType)),
      },
      members : {
        type: new GraphQLList(TicketType),
      }
  }
});