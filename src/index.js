const chalk = require('chalk');

import { EntoliOutput } from './EntoliOutput';
import { EntoliList } from './EntoliList';

console.log(chalk.blue('Hello world!'));

let p = new EntoliList();
p.start().then(a => {
//nothing
});


/*
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let i = 0;

let s = new EntoliOutput();
s.setup();

process.stderr.write('\x1B[?25l')

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        //show cursor
        process.stderr.write('\x1B[?25h');
        s.exit();
        process.stdin.setRawMode(false);
        //process.exit();
    } else {

        if (key.name == 'e') {

            //console.log(s.buildOutput(3));

            return;
        }

        i += 1;
        
        s.update([['i', i]]);

    }
});
*/