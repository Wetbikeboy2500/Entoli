//TODO: make a simple question and response input
import { EntoliOutput } from './EntoliOutput';
import EntoliInterface from './EntolInterface';
import chalk from 'chalk';

export default class SimpleEntoliPrompt {
    constructor(str) {
        this.prompt = str;

        return () => {
            this.answer = '';

            return new Promise((resolve, reject) => {
                let s = new EntoliOutput([
                    ['text', ''],
                    ['shown', true]
                ]);

                s.setup([
                    [this.prompt, ' ', () => chalk.green(s.get('text')), () => (s.get('shown')) ? chalk.bgWhite(' ') : '']
                ]);

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
                        resolve(this.answer.trim());
                    },
                    update: (str, key) => {
                        if (str == undefined)
                            return;

                        //TODO: Add cursor movement from pressing left and right keys (may get a little complex depending on my approach)
                        if (key.name == 'backspace') {
                            this.answer = this.answer.substring(0, this.answer.length - 1);
                        } else {
                            this.answer += str;
                        }

                        s.update([
                            ['text', this.answer]
                        ]);
                    }
                });
            });
        }
    }
}