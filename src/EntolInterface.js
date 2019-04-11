import readline from 'readline';

export default class EntoliInterface {
    constructor({ update, enter, preenter = null, exit, hideCursor = true, catchEnter = true, exitMessage = false, preventExit = false }) {
        this.hideCursor = hideCursor;
        this.exitMessage = exitMessage;
        this.preventExit = preventExit;
        this.start();

        this.event = (str, key) => {
            if (key.ctrl && key.name === 'c' || key.code == '[3;;') {
                exit();
                this.stop();
                this.exit();
            } else if (key.name == 'return' && catchEnter) {
                if (preenter)
                    preenter();

                this.stop();
                enter();
            } else {
                if (key.code == '[W') {
                    key.name = 'backspace';
                    str = '';
                }
                update(str, key);
            }
        };

        process.stdin.on('keypress', this.event);
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
        process.stdin.removeListener('keypress', this.event);
        process.stdin.pause();
    }

    exit () {
        process.stderr.write('\x1B[?25h');
        process.stdin.setRawMode(false);
        if (this.exitMessage)
            process.stdout.write('Exited the object');

        if (!this.preventExit)
            process.exit();
    }
}