import { EntoliOutput } from './EntoliOutput';
import EntoliInterface from './EntolInterface';
import chalk from 'chalk';

export default function SimpleEntoliPrompt (promptDefault, { enterMessage = true, exitMessage = true, preventExit = false } = {}) {
    let prompt = promptDefault;
    let answer = '';

    return (optional = {}) => {
        enterMessage = (optional.enterMessage === true) ? true : (optional.enterMessage === false) ? false : enterMessage;
        exitMessage = (optional.exitMessage === true) ? true : (optional.exitMessage === false) ? false : exitMessage;
        preventExit = (optional.preventExit === true) ? true : (optional.preventExit === false) ? false : preventExit;
        
        if (optional.prompt) {
            prompt = optional.prompt;
        } else {
            prompt = promptDefault;
        }

        
        if (optional.answer) {
            answer = optional.answer;
        } else {
            answer = '';
        }

        let position = answer.length;

        return new Promise((resolve, reject) => {
            try {
                let s = new EntoliOutput([
                    ['text', answer]
                ]);

                s.setup([
                    [prompt, ' ', () => chalk.green(s.get('text'))]
                ]);

                process.stdout.cursorTo(prompt.length + position + 1);

                new EntoliInterface({
                    exit: () => {
                        s.exit();
                        resolve();
                    },
                    enter: () => {
                        s.exit();
                        if (enterMessage)
                            process.stdout.write(`Wrote: ` + chalk.blue(answer) + '\n');

                        resolve(answer);
                    },
                    update: (str, key) => {
                        let name = key.name;

                        if (str == undefined && name != 'left' && name != 'right')
                            return;

                        if (name == 'backspace') {
                            if (position - 1 >= 0) {
                                let a = answer.split('');
                                a.splice(position - 1, 1);
                                answer = a.join('');
                                position -= 1;
                            }
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
                    hideCursor: false,
                    exitMessage: exitMessage,
                    preventExit: preventExit
                });
            } catch (e) {
                reject(e);
            }
        });
    };
}