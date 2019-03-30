import readline from 'readline';

export default class EntoliInterface {
    constructor({ update, enter, preenter = null, exit, hideCursor = true, catchEnter = true }) {
        this.hideCursor = hideCursor;
        this.start();

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                exit()
                this.exit();
            } else if (key.name == 'return' && catchEnter) {
                if (preenter)
                    preenter();

                this.stop();
                enter();
            } else {
                update(str, key);
            }
        });
    }

    //sets-up the input mode
    start () {
        process.stdin.resume();
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        if (this.hideCursor)
            process.stderr.write('\x1B[?25l');
    }

    stop () {
        process.stderr.write('\x1B[?25h');
        process.stdin.setRawMode(false);
        //process.stdout.write(`Selected option: ` + chalk.blue(that.items[that.index][0]));
        process.stdout.moveCursor(0, 1);
        process.stdout.cursorTo(0);
        //remove all listerners named keypress to eliminate itself
        process.stdin.removeAllListeners(['keypress']);
        process.stdin.pause();
    }

    exit () {
        process.stderr.write('\x1B[?25h');
        process.stdin.setRawMode(false);
        process.stdout.write('Exited the object');
        process.exit();
    }
}