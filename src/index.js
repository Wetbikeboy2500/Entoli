//const { EntoliList, EntoliPrompt } = require('../dist/exports.js');
import EntoliPrompt from './SimpleEntoliPrompt';
import EntoliList from './EntoliList';
import EntoliListMulti from './EntoliListMulti';

let EP = new EntoliListMulti([
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    ['0', '0'],
])

EP().then(a => console.log(a))