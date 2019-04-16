import EntoliPrompt from './EntoliSimplePrompt';
import EntoliMultiPrompt from './EntoliMultiPrompt';
import EntoliList from './EntoliList';
import { EntoliDivider as Divider } from './EntoliUtil';
import EntoliMultiList from './EntoliListMulti';

let El = EntoliPrompt('h');

El = EntoliList([
    ['Name 1', 'Value 1'],
    Divider,
    ['Name 2', 'Value 2']
]);

EntoliMultiPrompt([
    El,
]).then((a) => console.log(a));