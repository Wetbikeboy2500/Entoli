import { EntoliOutput } from "./EntoliOutput";
import chalk from 'chalk';
import EntoliInterface from "./EntolInterface";
import { EntoliIndent as Indent } from './EntoliUtil';

export default function EntoliList (items, { enterMessage = true, exitMessage = true, preventExit = false } = {}) {
    return () => {
        let index = 0;

        return new Promise((resolve, reject) => {
            try {
                let selectionOptions = items.filter(a => typeof a != 'function');

                let s = new EntoliOutput([
                    ...selectionOptions.map((a, i) => {
                        return ['index' + i, i];
                    }),
                    ['selection', selectionOptions[0][0]],
                    ['selected', 0]
                ]);

                let tmp = selectionOptions.map((a, i) => {
                    return [Indent(), () => (s.get('selected') === i) ? chalk.green('*') : '-', ') ', a[0]];
                });

                items.forEach((a, i) => {
                    if (typeof a == 'function') {
                        tmp.splice(i, 0, [a()]);
                    }
                });

                s.setup([
                    [`Select an option`],
                    ...tmp,
                    [`Current Selection: `, () => chalk.green(s.get('selection'))]
                ]);

                new EntoliInterface({
                    exit: () => {
                        s.exit();
                        resolve();
                    },
                    enter: () => {
                        s.exit();
                        if (enterMessage)
                            process.stdout.write(`Selected option: ` + chalk.blue(selectionOptions[index][0]) + '\n');

                        resolve(selectionOptions[index]);
                    },
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

                        s.update([
                            ['selected', index],
                            ['selection', selectionOptions[index][0]]
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