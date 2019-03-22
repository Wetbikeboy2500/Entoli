const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


class Ouputter {
    constructor(arr) {
        //doesn't do much now
        for (let a of arr) {
            this[a] = null;
        }

        this.__logging = false;
        this.__hasOutput = false;

        this.setOutputString();

        this.__outputting = false;
    }

    startLogging () {
        this.__logging = true;
    }

    stopLogging () {
        this.__logging = false;
    }

    //input updates
    update (inputStuff) {
        for (let a of inputStuff) {
            this[a.name] = a.value;
        }

    }

    setOutputString (outputArray = []) {
        outputArray = [
            `Select an option`,
            `\n`,
            () => this[`i`], //this may have to change or work differently
            `) Hello world`,
            `\n`,
            () => this[`i`] + 1,
            `) Exit`,
            `\n`,
            `Last key pressed, `,
            () => this[`key`],
            `, `,
            () => this[`o`]
        ];

        this.__string = outputArray;
    }

    output () {
        if (!this.__outputting) {
            this.__outputting = true;

            let o = this.__string.map((a) => {
                if (typeof a == 'function') {
                    return a();
                }
                return a;
            }).join(``);


            this.coolClear(2);

            process.stdout.cursorTo(0);
            process.stdout.write(o);
            //process.stdout.cursorTo(0);//this makes the cursor look so much better than having weird midplaced selector

            this.__hasOutput = true;

            setTimeout(() => {
                this.__outputting = false;
            }, 100);
        }
    }

    clear () {
        if (this.__hasOutput) {
            process.stdout.moveCursor(0, -3);
        }

        process.stdout.clearLine();
    }

    coolClear (limit = 2) {
        for (let i = 0; i <= limit; i++) {
            process.stdout.clearLine();
            process.stdout.moveCursor(0, -1);
        }
        process.stdout.clearLine();

        process.stdout.cursorTo(0);
    }
}

let outp = new Ouputter([`i`, `key`, `o`]);

outp.output();

let e =``;

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {

        if (key.name == 'e') {
            outp.coolClear();

            return;
        }

        if (str)
        e += str;

        i += 1;

        outp.update([
            {
                name: 'i',
                value: i
            },
            {
                name: 'key',
                value: key.name
            },
            {
                name: 'o',
                value: e
            }
        ]);

        outp.output();

        /*
        console.log(key);

        if (key.name == "up" || key.name == "down") {
            if (i == 0) {
                i = 1;
            } else {
                i = 0;
            }
            printProgress(key.name);
        } else if (key.name == "enter") {
            process.exit(0);
        } else {

        }*/
    }
});

let resetting = false;

let i = 0;


//TODO: Make a refresh rate that decreases the more it refreshes to limit stuck keys and trying to push the system
function printProgress (key) {
    if (!resetting) {
        resetting = true;
        if (t != 0) {
            process.stdout.moveCursor(0, -3);
        }

        t = 1;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(
            `Select an option: \n ${i}) Hello world \n ${i + 1}) Exit \n Last key pressed: ${key}`
        );
        process.stdout.cursorTo(0);//this makes the cursor look so much better than having weird midplaced selector
        setTimeout(() => {
            resetting = false;
        }, 100);
    }
}



/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> '
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});*/