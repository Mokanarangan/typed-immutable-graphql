export default (name, fields) => {
  return `
  
const ${name}Type = new GraphQLObjectType({
  name: '${name}Type',
  fields: {${fields.join(',')}
  }
});`
};
