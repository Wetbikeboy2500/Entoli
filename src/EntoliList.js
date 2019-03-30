import { EntoliOutput } from "./EntoliOutput";
import chalk from 'chalk';
import EntoliInterface from "./EntolInterface";

export default class EntoliList {
    constructor(items) {
        return () => {
            let index = 0;

            return new Promise((resolve, reject) => {
                let s = new EntoliOutput([
                    ...items.map((a, i) => {
                        return ['index' + i, i];
                    }),
                    ['selection', items[0][0]],
                    ['selected', 0]
                ]);
                s.setup([
                    [`Select an option`],
                    ...items.map((a, i) => {
                        return ['    ', () => (s.get('selected') === i) ? chalk.green('*') : '-', ') ', a[0]];
                    }),
                    [`Current Selection: `, () => chalk.green(s.get('selection'))]
                ]);

                new EntoliInterface({
                    exit: () => {
                        s.exit();
                    },
                    enter: () => {
                        s.exit();
                        process.stdout.write(`Selected option: ` + chalk.blue(items[index][0]) + '\n');
                        resolve(items[index]);
                    },
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

                        s.update([
                            ['selected', index],
                            ['selection', items[index][0]]
                        ]);
                    }
                });
            });
        };
    }
}