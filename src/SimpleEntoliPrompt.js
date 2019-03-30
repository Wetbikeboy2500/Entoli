//TODO: make a simple question and response input
import { EntoliOutput } from './EntoliOutput';
import EntoliInterface from './EntolInterface';
import chalk from 'chalk';

export default class SimpleEntoliPrompt {
    constructor(str) {
        this.prompt = str;

        return () => {
            this.answer = '';
            this.position = 0;

            return new Promise((resolve, reject) => {
                let s = new EntoliOutput([
                    ['text', ' '],
                    ['shown', true],
                    ['position', 0]
                ]);

                s.setup([
                    [this.prompt, ' ', () => {
                        if (s.get('shown')) {
                            let a = s.get('text').split('');
                            a.splice(s.get('position'), 0, chalk.bgWhite(' '));
                            return chalk.green(a.join(''));
                        } else {
                            return chalk.green(s.get('text'));
                        }
                    }]
                ]);

                //[this.prompt, ' ', () => chalk.green(s.get('text').split('').splice(s.get('position'), 0, (s.get('shown')) ? chalk.bgWhite('_') : '').join(''))]

                new EntoliInterface({
                    exit: () => {
                        s.exit();
                    },
                    preenter: () => {
                        s.update([
                            ['shown', false]
                        ]);
                    },
                    enter: () => {
                        s.exit();
                        process.stdout.write(`Wrote: ` + chalk.blue(this.answer) + '\n');
                        resolve(this.answer.trim());
                    },
                    update: (str, key) => {
                        let name = key.name;

                        if (str == undefined && name != 'left' && name != 'right')
                            return;

                        if (name == 'backspace') {
                            this.answer = this.answer.substring(0, this.answer.length - 1);
                            this.position -= 1;
                        } else if (name == 'left') {
                            this.position -= 1;
                        } else if (name == 'right') {
                            this.position += 1;
                        } else {
                            let a = this.answer.split('');
                            a.splice(this.position, 0, str);
                            this.answer = a.join('');
                            this.position += str.length;
                        }

                        //get rid of any weird positioning
                        if (this.position < 0) {
                            this.position = 0;
                        }

                        if (this.position >= this.answer.length) {
                            this.position = this.answer.length;
                        }

                        s.update([
                            ['text', this.answer],
                            ['position', this.position]
                        ]);
                    }
                });
            });
        }
    }
}