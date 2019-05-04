import EntoliPrompt from './EntoliSimplePrompt';
import EntoliMultiPrompt from './EntoliMultiPrompt';
import EntoliList from './EntoliList';
import { EntoliDivider as Divider } from './EntoliUtil';
import EntoliMultiList from './EntoliListMulti';
import EntoliListMulti from './EntoliListMulti';

import EntoliConfirm from './EntoliConfirm';

/*
let ec = EntoliConfirm('Do you want to continue');

let prompts = [
    'Test1',
    'test2',
    'test3'
];

//linked confirmed list that requires all answers to be true
EntoliMultiPrompt(prompts.map(a => () => ec({ prompt: a })))
    .then(a => console.log(!a.includes(false)));


let El = EntoliPrompt('h', { enterMessage: false });
*/

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


let El = EntoliListMulti([
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
        defaultSelected: [1]
    }),
]).then((a) => console.log(a));