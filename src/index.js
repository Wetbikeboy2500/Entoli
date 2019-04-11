import EntoliPrompt from './SimpleEntoliPrompt';
import EntoliMultiPrompt from './EntoliMultiPrompt';

let El = EntoliPrompt('h');

EntoliMultiPrompt([
    El,
    El,
]).then((a) => console.log(a));