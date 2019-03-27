import { EntoliOutput } from "./EntoliOutput";
import readline from 'readline';

export class EntoliList {
    constructor (items) {
        this.items = [
            ['hello', 'world'],
            ['good bye', 'world']
        ];

        this.index = 0;
    }

    start () {
        let that = this;
        return new Promise((resolve, reject) => {
            readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);
            process.stderr.write('\x1B[?25l');

            let s = new EntoliOutput([
                ...that.items.map((a, i) => {
                    return ['index' + i, i];
                }),
                ['selection', 'null']
            ]);
            s.setup([
                [`Select an option`],
                ...that.items.map((a, i) => {
                    return ['    ', s.get('index' + i), ') ', a[0]];
                }),
                [`Current Selection: `, s.get('selection')]
            ]);

            process.stdin.on('keypress', (str, key) => {
                if (key.ctrl && key.name === 'c') {
                    //show cursor
                    process.stderr.write('\x1B[?25h');
                    s.exit();
                    process.stdin.setRawMode(false);
                    process.stdout.write('Exited the object');
                    process.exit();
                } else {

                    if (key.name == 'up') {
                        that.index++;
                    }

                    if (key.name == 'down') {
                        that.index--;
                    }

                    process.stdout.write(that.index);
                    
                    s.update(that.items.map((a, i) => {
                        return ['index' + i, i + that.index];
                    }));
            
                }
            });
        });
    }
}