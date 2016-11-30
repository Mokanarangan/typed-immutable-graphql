import chai from 'chai';
import { Record, Maybe, Typed, List } from '../src/index.js';
chai.use(require('chai-string'));
import fs from 'fs';

const { expect } = chai;

const check = (record, filename, resolveMap) => expect(record.resolve(resolveMap))
  .to.equalIgnoreSpaces(fs.readFileSync(`${__dirname}/graphql/${filename}.js`).toString())

const writeFile = (record, filename, resolveMap) => fs.closeSync(fs.openSync(`${__dirname}/graphql/${filename}.js`,'w'))
  || fs.writeFileSync(`${__dirname}/graphql/${filename}.js`, record.resolve(resolveMap));

describe('Non dependent conversion', () => {
  it('should convert a record model with primitive data types', () =>{
    const Ticket = Record({
      id: Number,
      name: String,
    }, 'Ticket');
    check(Ticket,'PrimitiveRecord')
  });

  it('should covert a record model with primitive maybe value' , () => {
    const Ticket = Record({
      id: Maybe(Number),
      name: Maybe(String),
    },'Ticket');
    check(Ticket, 'PrimitiveMaybeRecord');
  });

  it('should convert a record with Fraction value', () => {
    const Ticket = Record({
      float: Maybe(Typed.Fraction()),
      floatNonNull: Typed.Fraction(),
    },'Ticket');
    check(Ticket, 'FractionRecord');

  });

  it('should convert record with primitive list', () => {
    const Ticket = Record({
      list: List(String),
    },'Ticket');
    check(Ticket, 'PrimitiveListRecord');

  });

  it('should resolve based on the resolvers', () =>{
    const Ticket = Record({
      list: List(String),
      str: Maybe(String),
    }, 'Ticket');

    const resolveMap = {
      'list': function resolve(member){
        return [
          {id: 1, message: `Member: ${member.id}, Ticket: 1`},
          {id: 2, message: `Member: ${member.id}, Ticket: 2`}
        ];
      } 
    };
    check(Ticket, 'PrimitiveResolvers', resolveMap);
  });
});

describe('Simple Depenedent conversion', () => {
  it('should do simple dependent conversion', () => {
    const Ticket = Record({
      id: Maybe(String),
      message: Number,
    }, 'Ticket');

    const Member = Record({
      id: String,
      tickets: Ticket,
    }, 'Member');

    check(Member, 'SimpleDependentRecord');

  });

  it('should do simple dependent conversion based on on resolver map for fields', () => {
    const Ticket = Record({
      id: Maybe(String),
      message: Number,
    }, 'Ticket');

    const Member = Record({
      id: String,
      tickets: Ticket,
    }, 'Member');

    const resolveMap = {
      'tickets': function resolve(member){
        return [
          {id: 1, message: `Member: ${member.id}, Ticket: 1`},
          {id: 2, message: `Member: ${member.id}, Ticket: 2`}
        ];
      } 
    };
    check(Member, 'SimpleDependentResolvers', resolveMap);
  });

  it('should do a simple dependent conversion for type', () =>{
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
    check(Member, 'SimpleDependentTypeResolver', resolveMap);
  });
});

describe('Complex dependent conversions',() => {
  it('should convert list based dependency conversion', () => {
    const Ticket = Record({
      id: Maybe(String),
      type: Maybe(String),
    }, 'Ticket');

    const Member = Record({
      id: Maybe(Number),
      tickets: List(Ticket),
    }, 'Member');

    const resolveMap = {
      'tickets': function resolve(memeber){
        return [
          {id: 1, message: `Member: ${member.id}, Ticket: 1`},
          {id: 2, message: `Member: ${member.id}, Ticket: 2`}
        ];
      }
    };

   check(Member, 'ComplexListRecord', resolveMap);
  });

  it('should convert maybe based record conversion', () => {
    const Ticket = Record({
      id: Maybe(String),
      type: Maybe(String),
    }, 'Ticket');

    const Member = Record({
      id: Maybe(Number),
      tickets: Maybe(Ticket),
    }, 'Member');

   check(Member, 'ComplexMaybeRecord');
  });

  it('should convert may be list', () => {
    const Ticket = Record({
      id: Maybe(String),
      type: Maybe(String),
    }, 'Ticket');

    const Member = Record({
      id: Maybe(Number),
      tickets: Maybe(List(Ticket)),
    }, 'Member');

    check(Member, 'ComplexMaybeListRecord');
  });
});

describe('Enum to graphql conversion', () => {
  it('should do simple enum conversion', () => {
    const EnumVal = Typed.Enum({
      SALARY: 'SALARY',
      HOURLY: 'HOURLY',
    },'enumVal');

    check(EnumVal, 'Enum');

  });

  it('should do a simple dependent enum conversion', () => {
    const EnumVal = Typed.Enum({
      SALARY: 'SALARY',
      HOURLY: 'HOURLY',
    },'EnumVal');

    const Employee = Record({
      id: String,
      salaryType: EnumVal,
    }, 'Employee')

    check(Employee, 'EnumSimpleDependentRecord');
  });

  it('should do a maybe dependent enum conversion', () => {
    const EnumVal = Typed.Enum({
      SALARY: 'SALARY',
      HOURLY: 'HOURLY',
    },'EnumVal');

    const Employee = Record({
      id: String,
      salaryType: Maybe(EnumVal),
    }, 'Employee');

    check(Employee, 'EnumMayBeRecord');

  });
});

describe('Nested graphql queries', () =>{
  it('should convert nested graphql query - level 3', () => {
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

    check(Project, 'NestedQuery');


  });
});
