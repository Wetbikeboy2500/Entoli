import { EntoliOutput } from "./EntoliOutput";
import readline from 'readline';
import chalk from 'chalk';
import EntoliInterface from "./EntolInterface";

export default class EntoliList {
    constructor(items) {
        this.items = items;

        return () => {
            this.index = 0;

            return new Promise((resolve, reject) => {
                let s = new EntoliOutput([
                    ...this.items.map((a, i) => {
                        return ['index' + i, i];
                    }),
                    ['selection', this.items[0][0]],
                    ['selected', 0]
                ]);
                s.setup([
                    [`Select an option`],
                    ...this.items.map((a, i) => {
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
                        process.stdout.write(`Selected option: ` + chalk.blue(this.items[this.index][0]) + '\n');
                        resolve(this.items[this.index]);
                    },
                    update: (str, key) => {
                        if (key.name == 'up') {
                            this.index--;
                        }

                        if (key.name == 'down') {
                            this.index++;
                        }

                        if (this.index >= this.items.length) {
                            this.index = 0;
                        }

                        if (this.index < 0) {
                            this.index = this.items.length - 1;
                        }

                        s.update([
                            ['selected', this.index],
                            ['selection', this.items[this.index][0]]
                        ]);
                    }
                });
            });
        };
    }
}