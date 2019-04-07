import { EntoliOutput } from "./EntoliOutput";
import chalk from 'chalk';
import EntoliInterface from "./EntolInterface";

export default class EntoliListMulti {
    constructor(items, options = {}) {
        let { enterMessage = true, exitMessage = true, preventExit = false } = options;
        items.push(['Confirm', '***cof*']);
        return () => {
            let index = 0;
            let selected = [];

            return new Promise((resolve, reject) => {
                try {
                    let s = new EntoliOutput([
                        ['selected', []],
                        ['index', 0],
                        ['selection', '']
                    ]);

                    s.setup([
                        ['Select an option'],
                        ...items.map((a, i) => {
                            return [() => (s.get('index') == i) ? chalk.blue('    > ') : '      ', () => s.get('selected').includes(i) ? chalk.green(a[0]) : a[0]];
                        }),
                        ['Current Selections: ', () => chalk.green(s.get('selection'))]
                    ]);

                    let r = new EntoliInterface({
                        exit: () => {
                            s.exit();
                            resolve();
                        },
                        catchEnter: false,
                        update: (str, key) => {
                            if (key.name == 'up') {
                                index--;
                            }

                            if (key.name == 'down') {
                                index++;
                            }

                            if (index >= items.length) {
                                index = 0;
                            }

                            if (index < 0) {
                                index = items.length - 1;
                            }

                            if (key.name == 'return') {
                                if (items[index][1] == '***cof*') {
                                    r.stop();
                                    s.exit();
                                    if (enterMessage)
                                        process.stdout.write('Selected Options: ' + selected.map((a) => {
                                            return items[a][0];
                                        }).join(', ') + '\n');

                                    resolve(selected.map((a) => {
                                        return items[a];
                                    }));
                                    return;
                                }

                                if (!selected.includes(index)) {
                                    selected.push(index);
                                } else {
                                    selected.splice(selected.findIndex(a => a == index), 1);
                                }
                            }

                            s.update([
                                ['index', index],
                                ['selected', selected],
                                ['selection', selected.map(a => items[a][0]).join(', ')]
                            ]);
                        },
                        exitMessage: exitMessage,
                        preventExit: preventExit
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }
    }
}