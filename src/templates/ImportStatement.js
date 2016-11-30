export default (importFile) => `
import {
  ${importFile.join(',\n  ')}
} from 'graphql/type';
`;
