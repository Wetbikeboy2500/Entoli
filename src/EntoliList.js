import { EntoliOutput } from "./EntoliOutput";
import readline from 'readline';
import chalk from 'chalk';
import { removeAllListeners } from "cluster";

//could make this return a promise from constructor to eliminate the start function
export default class EntoliList {
    constructor(items) {
        this.items = items;
    }

    start () {
        this.index = 0;

        let that = this;
        return new Promise((resolve, reject) => {
            try {
                readline.emitKeypressEvents(process.stdin);
                process.stdin.setRawMode(true);
                process.stderr.write('\x1B[?25l');

                let s = new EntoliOutput([
                    ...that.items.map((a, i) => {
                        return ['index' + i, i];
                    }),
                    ['selection', that.items[0][0]],
                    ['selected', 0]
                ]);
                s.setup([
                    [`Select an option`],
                    ...that.items.map((a, i) => {
                        return ['    ', () => (s.get('selected') === i) ? chalk.green('*') : '-', ') ', a[0]];
                    }),
                    [`Current Selection: `, () => chalk.green(s.get('selection'))]
                ]);

                process.stdin.on('keypress', (str, key) => {
                    if (key.ctrl && key.name === 'c') {
                        //show cursor
                        process.stderr.write('\x1B[?25h');
                        s.exit();
                        process.stdin.setRawMode(false);
                        process.stdout.write('Exited the object');
                        process.exit();
                    } else if (key.name == 'return') {
                        process.stderr.write('\x1B[?25h');
                        s.exit();
                        process.stdin.setRawMode(false);
                        process.stdout.write(`Selected option: ` + chalk.blue(that.items[that.index][0]));
                        process.stdout.moveCursor(0, 1);
                        process.stdout.cursorTo(0);
                        //remove all listerners named keypress to eliminate itself
                        process.stdin.removeAllListeners(['keypress']);
                        
                        resolve(that.items[that.index]);
                    } else {

                        if (key.name == 'up') {
                            that.index--;
                        }

                        if (key.name == 'down') {
                            that.index++;
                        }

                        if (that.index >= that.items.length) {
                            that.index = 0;
                        }

                        if (that.index < 0) {
                            that.index = that.items.length - 1;
                        }

                        s.update([
                            ['selected', that.index],
                            ['selection', that.items[that.index][0]]
                        ]);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}