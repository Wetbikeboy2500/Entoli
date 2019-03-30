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
                    ['text', '']
                ]);

                s.setup([
                    [this.prompt, ' ', () => chalk.green(s.get('text'))]
                ]);

                process.stdout.cursorTo(this.prompt.length + this.position + 1);

                new EntoliInterface({
                    exit: () => {
                        s.exit();
                    },
                    enter: () => {
                        s.exit();
                        process.stdout.write(`Wrote: ` + chalk.blue(this.answer) + '\n');
                        resolve(this.answer);
                    },
                    update: (str, key) => {
                        let name = key.name;

                        if (str == undefined && name != 'left' && name != 'right')
                            return;

                        if (name == 'backspace') {
                            let a = this.answer.split('');
                            a.splice(this.position - 1, 1);
                            this.answer = a.join('');
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
                            ['text', this.answer]
                        ]);

                        process.stdout.cursorTo(this.prompt.length + this.position + 1);
                    },
                    hideCursor: false
                });
            });
        }
    }
}