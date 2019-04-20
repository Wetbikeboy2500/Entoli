import EntoliPrompt from './EntoliSimplePrompt';
import EntoliMultiPrompt from './EntoliMultiPrompt';
import EntoliList from './EntoliList';
import { EntoliDivider as Divider } from './EntoliUtil';
import EntoliMultiList from './EntoliListMulti';

let El = EntoliPrompt('h', { enterMessage: false });


/*
EntoliMultiPrompt([
    () => El({
        preventExit: true
    }),
    () => El({
        prompt: 'Yes?',
        enterMessage: true
    })
]).then(a => console.log(a));*/


El = EntoliList([
    ['Name 1', 'Value 1'],
    Divider,
    ['Name 2', 'Value 2']
]);

EntoliMultiPrompt([
    () => El({
        items: [
            ['hello', null],
            ['world', null]
        ],
        defaultSelected: 1
    }),
]).then((a) => console.log(a));