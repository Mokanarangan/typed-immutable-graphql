import { Record  as OriginalRecord, List as OriginalList, Maybe as OriginalMaybe, Typed } from 'typed-immutable';
import _ from 'lodash';
import Fraction from 'fraction.js';
import fields from './templates/Fields';
import objectType from './templates/ObjectType';
import enumType from './templates/EnumType';
import importStatement from './templates/ImportStatement';
import fs from 'fs';

const Record  = (args, name) => {
  const record = OriginalRecord({ args });
  record.type = `${name}Type`;
  record.resolve = (resolveMap = {}, withImport = true) => {
    const importFile = [];
    let dependent = '';
    importFile.push('GraphQLObjectType');
    const fieldMap = _.map(args, (tFn, name)=> {
      if(tFn.resolve){
        const gen2 = tFn.resolve(resolveMap[tFn],false);
        dependent = _.includes(dependent, gen2) ? dependent
        : `
        ${dependent}
        ${gen2}`;
        importFile.push(tFn.importFile)
      } else {
        importFile.push(tFn.importFile);
      }
      if(!tFn.canNull)
        importFile.push('GraphQLNonNull');
      record.importFile = importFile;
      const resolver = resolveMap[name] || null;
      return fields(name, tFn, resolver)
    });
    record.importFile = _(importFile)
      .flattenDeep()
      .uniq()
      .filter(val => val)
      .sortBy()
      .value();
    const genertedCode =  withImport ? `
      ${importStatement(record.importFile)}
      ${dependent}
      ${objectType(name, fieldMap)}`
    : `
    ${dependent}
    ${objectType(name, fieldMap)}`;
    return genertedCode.replace(/\n\s*\n/g, '\n\n'); 
  };
  return record;
}

const List = (args) => {
  const list = OriginalList(args);
  list.importFile = ['GraphQLList'];
  if(args.resolve){
    list.resolve = (resolveMap) => {
      const generated =  args.resolve(resolveMap, false)
      list.importFile.push(args.importFile);
      return generated;
    };
  } else {
    list.importFile.push(args.importFile);
  }

  list.type = `new GraphQLList(${args.type || args.name})`;
  return list;
}

const Maybe = (args) => {
  const maybe = OriginalMaybe(args);
  maybe.canNull = true;
  maybe.importFile = [args.importFile];
  if(args.resolve){
    maybe.resolve = (resolveMap) => {
      const generated =  args.resolve(resolveMap, false)
      maybe.importFile.push(args.importFile);
      return generated;
    };
  }
  maybe.type = args.type || args.name;
  return maybe;
}

Typed.Fraction = (defaultValue) => {
  const typed = Typed('Fraction', value => {
    try {
      return new Fraction(value);
    } catch (error) {
      return TypeError(error);
    }
  }, new Fraction(defaultValue));
  typed.type = 'GraphQLFloat';
  typed.importFile = 'GraphQLFloat';
  return typed;
}



Typed.Enum = (types, name, defaultValue) => {
  if (!(types instanceof Object)) {
    throw TypeError(`"${values}" is not an object`);
  }
  const map = {};
  _.each(types, (val, index) => {
    map[val] = val;
  });

  const validValues = Object.keys(types).join(', ');

  let TypedEnum = Typed(`Enum(${validValues})`, value => {
    if (!map[value] && value !== undefined) {
      return TypeError(`"${value}" should be in [${validValues}]`);
    }
    return value;
  }, defaultValue);

  _.each(types, (val, index) => {
    TypedEnum[index] = val;
  });
  TypedEnum.importFile = 'GraphQLEnumType';
  TypedEnum.type = `${name}Type`;
  TypedEnum.resolve = () => enumType(TypedEnum.type, types) ;


  return TypedEnum;
};

String.type = 'GraphQLString';
String.importFile = 'GraphQLString';

Number.type = 'GraphQLInt';
Number.importFile = 'GraphQLInt';

export { Record, List, Maybe, Typed };

