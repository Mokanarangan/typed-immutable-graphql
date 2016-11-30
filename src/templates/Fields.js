
export default (name, fn, resolver) => {
  let type;
  if(fn.canNull){
    type = fn.type;
  } else {
    type = `new GraphQLNonNull(${fn.type || fn.name})`;

  }
  return `
      ${name} : {
        type: ${type},${resolver ? `\n\t${resolver.toString().replace('function','')}` : ''}
      }`
};
