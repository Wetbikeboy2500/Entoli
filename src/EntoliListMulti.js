import { EntoliOutput } from "./EntoliOutput";
import chalk from 'chalk';
import EntoliInterface from "./EntolInterface";

export default function EntoliListMulti (itemsDefault, { defaultPrompt = 'Select option(s)', enterMessage = true, exitMessage = true, preventExit = false } = {}) {
    return (optional = { enterMessage, exitMessage, preventExit }) => {
        let items = optional.items || itemsDefault;

        items.push(['Confirm', '***cof*']);

        enterMessage = optional.enterMessage;
        exitMessage = optional.exitMessage;
        preventExit = optional.preventExit;

        let prompt = optional.prompt || defaultPrompt;
        let index = optional.cursorPosition || 0;
        let selected = optional.defaultSelected || [];

        return new Promise((resolve, reject) => {
            try {
                let selectionOptions = items.filter(a => typeof a != 'function');

                let s = new EntoliOutput([
                    ['selected', selected],
                    ['index', index],
                    ['selection', selected.map(a => selectionOptions[a][0]).join(', ')]
                ]);

                let tmp = selectionOptions.map((a, i) => {
                    return [() => (s.get('index') == i) ? chalk.blue('    > ') : '      ', () => s.get('selected').includes(i) ? chalk.green(a[0]) : a[0]];
                });

                items.forEach((a, i) => {
                    if (typeof a == 'function') {
                        tmp.splice(i, 0, [a()]);
                    }
                });

                s.setup([
                    [prompt],
                    ...tmp,
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

                        if (index >= selectionOptions.length) {
                            index = 0;
                        }

                        if (index < 0) {
                            index = selectionOptions.length - 1;
                        }

                        if (key.name == 'return') {
                            if (selectionOptions[index][1] == '***cof*') {
                                r.stop();
                                s.exit();
                                if (enterMessage)
                                    process.stdout.write('Selected Options: ' + selected.map((a) => {
                                        return selectionOptions[a][0];
                                    }).join(', ') + '\n');

                                resolve(selected.map((a) => {
                                    return selectionOptions[a];
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
                            ['selection', selected.map(a => selectionOptions[a][0]).join(', ')]
                        ]);
                    },
                    exitMessage: exitMessage,
                    preventExit: preventExit
                });
            } catch (e) {
                reject(e);
            }
        });
    };
}