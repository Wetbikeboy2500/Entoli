import { EntoliOutput } from "./EntoliOutput";
import chalk from 'chalk';
import EntoliInterface from "./EntolInterface";

export default function EntoliConfirm (promptDefault, { enterMessage = true, defaultReturn = true, exitMessage = true, preventExit = false } = {}) {
    let prompt = promptDefault;
    let answer = '';
    let dreturn = defaultReturn;

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

        if (optional.defaultReturn) {
            dreturn = optional.defaultReturn;
        } else {
            dreturn = defaultReturn;
        }

        let position = answer.length;

        return new Promise((resolve, reject) => {
            try {
                let confirm = dreturn;

                let s = new EntoliOutput([
                    ['text', answer],
                    ['confirm', dreturn]
                ]);

                s.setup([
                    [prompt, ' (', () => (s.get('confirm') === true) ? chalk.green('Y') : 'y', '/', () => (s.get('confirm') === false) ? chalk.green('N') : 'n', ')', () => chalk.green(s.get('text'))]
                ]);

                process.stdout.cursorTo(prompt.length + position + 1 + 5);

                new EntoliInterface({
                    exit: () => {
                        s.exit();
                        resolve();
                    },
                    enter: () => {
                        s.exit();
                        if (enterMessage)
                            process.stdout.write(`Wrote: ` + ((confirm === null) ? dreturn : confirm).toString() + '\n');

                        resolve((confirm === null) ? dreturn : confirm);
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

                        let accept = ['y', 'ye', 'yes'];
                        let deny = ['n', 'no'];  

                        if (accept.includes(answer.toLowerCase())) {
                            confirm = true;
                        } else if (deny.includes(answer.toLowerCase())) {
                            confirm = false;
                        } else {
                            confirm = null;
                        }

                        s.update([
                            ['text', answer],
                            ['confirm', (confirm === null) ? dreturn : confirm]
                        ]);

                        process.stdout.cursorTo(prompt.length + position + 1 + 5);
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