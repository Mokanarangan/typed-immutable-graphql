# typed-immutable-graphql
Generated graphql types from typed-immutable record model. Can be generated at compile time. Refer example.

#### Example 1
```
import { Record } from 'typed-immutable-graphql';

const Ticket = Record({
      id: Number,
      name: String,
    }, 'Ticket');
```
`Ticket.resolve()` will yield you the following string
```
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      id : {
        type: new GraphQLNonNull(GraphQLInt),
      },
      name : {
        type: new GraphQLNonNull(GraphQLString),
      }
  }
}); 
```
#### Example 2 (With resolvers)

```
const Ticket = Record({
      id: Maybe(String),
      message: Number,
    }, 'Ticket');

    const Member = Record({
      id: String,
      tickets: Ticket,
    }, 'Member');

    //resolve map for ticket model
    const ticketResolveMap = {
      'message': function resolve(member){
        return [
          {id: 1, message: `Member: ${member.id}, Ticket: 1`},
          {id: 2, message: `Member: ${member.id}, Ticket: 2`}
        ];
      } 
    };
    //resolveMap for member which will be exposed
    const resolveMap = {
      'tickets': function resolve(member){
        return [
          {id: 1, message: `Member: ${member.id}, Ticket: 1`},
          {id: 2, message: `Member: ${member.id}, Ticket: 2`}
        ];
      } 
    };
    resolveMap[Ticket] = ticketResolveMap;
```
`Member.resolve()` will yield you the following string
```
import {
  GraphQLInt,
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
      message : {
        type: new GraphQLNonNull(GraphQLInt),
	 resolve(member) {
        return [{ id: 1, message: 'Member: ' + member.id + ', Ticket: 1' }, { id: 2, message: 'Member: ' + member.id + ', Ticket: 2' }];
      }
      }
  }
});

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
      id : {
        type: new GraphQLNonNull(GraphQLString),
      },
      tickets : {
        type: new GraphQLNonNull(TicketType),
	 resolve(member) {
        return [{ id: 1, message: 'Member: ' + member.id + ', Ticket: 1' }, { id: 2, message: 'Member: ' + member.id + ', Ticket: 2' }];
      }
      }
  }
});
```
#### Example 3 (Nested expression)

```
const Ticket = Record({
      id: Maybe(String),
      type: Maybe(String),
    }, 'Ticket');

    const Member = Record({
      id: Maybe(String),
      name: Maybe(String),
      tickets: Maybe(List(Ticket))
    }, 'Member');

    const Project = Record({
      id: Maybe(Number),
      type: Maybe(String),
      tickets: List(Member),
      members: Maybe(List(Ticket)),
    }, 'Project');
```
`Project.resolve()` will yield you the following string

```
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
```

You can place the generated code the code at compile time with a hook and use it.

Not sure how useful this project is. Refer to the test for Enum, Float.

### License
MIT

