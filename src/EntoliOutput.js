export class EntoliOutput {
    constructor(attributes = []) {
        this.values = new Map(attributes);

        this.line = 0;

        this.output = [];
        this.enabled = true;
        this.isSetup = false;
    }

    setup (arr1) {
        this.template = arr1;

        let that = this;

        this.output = this.template.map((a, i) => {
            return that.buildOutput(i);
        });

        this.output.forEach((a, i) => {
            if (i + 1 == this.output.length) {
                process.stdout.write(a);
            } else {
                process.stdout.write(a + `\n`);
                this.line = this.line + 1;
            }
        });

        this.isSetup = true;
    }

    get (name) {
        if (this.values.has(name)) {
            return this.values.get(name);
        }
        return null;
    }

    update (attributes = []) {
        if (this.isSetup && this.enabled) {
            //attributes override the old and can add new ones
            this.values = new Map([...this.values, ...attributes]);

            this.checkDiff();
        }
    }

    //checks what has currently been outputed vs what should be. This limits the amount of updates to all the text
    checkDiff () {
        let difs = [];
        let that = this;

        this.template.forEach((a, i) => {
            let line = i;
            let build = that.buildOutput(line);
            if (build !== that.output[i]) {
                that.output[i] = build;
                difs.push(line);
            }
        });

        for (let a of difs) {
            this.clear(a);
            this.render(a);
        }
    }

    render (line) {
        if (this.enabled) {
            let m = this.goTo(line);
            process.stdout.write(this.output[line]);
            this.changeLine(m);
        }
    }

    clear (line) { //0 is first from bottom, 1 is second, etc.
        if (this.enabled && this.isSetup) {
            let m = this.goTo(line);
            process.stdout.clearLine(0);
            this.changeLine(m);
        }
    }

    buildOutput (line) {
        let data = this.template[line];

        return data.map((a) => {
            if (typeof a == 'function') {
                return a();
            }
            return a;
        }).join('');
    }

    exit () {
        this.enabled = false;
        process.stdout.moveCursor(0, this.line * -1)
        process.stdout.cursorTo(0);
        process.stdout.clearScreenDown();
        process.stdout.clearLine(0);
    }

    goTo (line) {
        let m = this.line - line;
        process.stdout.moveCursor(0, m * -1);
        process.stdout.cursorTo(0);
        this.line = this.line - m;
        return m;
    }

    changeLine (x) {
        process.stdout.moveCursor(0, x);
        this.line = this.line + x;
    }
}