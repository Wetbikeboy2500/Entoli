const chalk = require('chalk');

import { EntoliOutput } from './EntoliOutput';

console.log(chalk.blue('Hello world!'));

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let i = 0;

let s = new EntoliOutput();
s.setup();

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {

        if (key.name == 'e') {

            //console.log(s.buildOutput(3));

            return;
        }

        i += 1;
        
        s.update([['i', i]]);

    }
});
