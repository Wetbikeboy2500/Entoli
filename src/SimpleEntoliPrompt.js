//TODO: make a simple question and response input
import { EntoliOutput } from './EntoliOutput';
import EntoliInterface from './EntolInterface';
import chalk from 'chalk';

export default class SimpleEntoliPrompt {
    constructor(prompt) {
        return () => {
            let answer = '';
            let position = 0;

            return new Promise((resolve, reject) => {
                try {
                    let s = new EntoliOutput([
                        ['text', '']
                    ]);

                    s.setup([
                        [prompt, ' ', () => chalk.green(s.get('text'))]
                    ]);

                    process.stdout.cursorTo(prompt.length + position + 1);

                    new EntoliInterface({
                        exit: () => {
                            s.exit();
                        },
                        enter: () => {
                            s.exit();
                            process.stdout.write(`Wrote: ` + chalk.blue(answer) + '\n');
                            resolve(answer);
                        },
                        update: (str, key) => {
                            let name = key.name;

                            if (str == undefined && name != 'left' && name != 'right')
                                return;

                            if (name == 'backspace') {
                                let a = answer.split('');
                                a.splice(position - 1, 1);
                                answer = a.join('');
                                position -= 1;
                            } else if (name == 'left') {
                                position -= 1;
                            } else if (name == 'right') {
                                position += 1;
                            } else {
                                let a = answer.split('');
                                a.splice(position, 0, str);
                                answer = a.join('');
                                position += str.length;
                            }

                            //get rid of any weird positioning
                            if (position < 0) {
                                position = 0;
                            }

                            if (position >= answer.length) {
                                position = answer.length;
                            }

                            s.update([
                                ['text', answer]
                            ]);

                            process.stdout.cursorTo(prompt.length + position + 1);
                        },
                        hideCursor: false
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }
    }
}