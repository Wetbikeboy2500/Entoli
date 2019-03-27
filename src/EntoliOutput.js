const log = require('simple-node-logger').createSimpleFileLogger('project.log');

export class EntoliOutput {
    constructor(attributes = []) {
        this.values = new Map(attributes);

        this.output = [];
        this.enabled = true;
    }

    setup (arr1) {
        this.template = arr1;

        log.info(this.template);

        let that = this;

        this.output = this.template.map((a, i) => {
            return that.buildOutput(that.template.length - 1 - i);
        });

        for (let i = 0; i < this.template.length; i++) {
            this.render(i);
        }
    }

    get (name) {
        if (this.values.has(name)) {
            return this.values.get(name);
        }
        return null;
    }

    update (attributes = []) {
        log.info(attributes);
        //attributes override the old and can add new ones
        this.values = new Map([...this.values, ...attributes]);

        this.checkDiff();
    }

    //checks what has currently been outputed vs what should be. This limits the amount of updates to all the text
    checkDiff () {
        let difs = [];
        let that = this;

        this.template.forEach((a, i) => {
            let line = that.template.length - 1 - i;
            let build = that.buildOutput(line);
            if (build !== that.output[i]) {
                that.output[i] = build;
                difs.push(line);
            }
        });

        log.info(difs);

        for (let a of difs) {
            this.render(a);
        }
    }

    render (line) {
        if (this.enabled) {
            this.clear(line);
            process.stdout.moveCursor(0, line * -1);
            process.stdout.cursorTo(0);
            process.stdout.write(this.output[this.output.length - 1 - line]);
            process.stdout.moveCursor(0, line);
        }
    }

    clear (line) { //0 is first from bottom, 1 is second, etc.
        process.stdout.moveCursor(0, line * -1);
        process.stdout.clearLine(0);
        process.stdout.moveCursor(0, line);
    }

    buildOutput (line) {
        line = Math.min(this.template.length - 1, line); //cannot choose line over length of array
        let data = this.template[this.template.length - 1 - line];

        return data.map((a) => {
            if (typeof a == 'function') {
                return a();
            }
            return a;
        }).join('');
    }

    exit () {
        this.enabled = false;
        process.stdout.moveCursor(0, -this.template.length);
        process.stdout.cursorTo(0);
        process.stdout.clearScreenDown();
    }
}