const stdin = require('mock-stdin').stdin();
const assert = require('chai').assert;
const { EntoliList, EntoliPrompt, EntoliListMulti } = require('../dist/exports');

describe('EntoliList', function () {
    let l = [
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5']
    ];

    let El = new EntoliList(l, { enterMessage: true, exitMessage: true, preventExit: true });
    it('Select first element', function (done) {
        El().then((a) => {
            assert.equal(a, l[0]);
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\r');
    });
    it('Select first element overflow', function (done) {
        El().then((a) => {
            assert.equal(a, l[0]);
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\u001B[B\u001B[B\u001B[B\u001B[B\u001B[B\r');
    });
    it('Select last element', function (done) {
        El().then((a) => {
            assert.equal(a, l[4]);
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\u001B[A\r');
    });
    it('Select middle element', function (done) {
        El().then((a) => {
            assert.equal(a, l[2]);
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\u001B[B\u001B[B\r');
    });
    it('Exit element', function (done) {
        El().then((a) => {
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\u001B[3;;');
    });
});

describe('SimpleEntoliPrompt', function () {
    let EP = new EntoliPrompt("Test", { enterMessage: true, exitMessage: true, preventExit: true });
    it('Correct input output', function (done) {
        EP().then((a) => {
            assert.equal(a, 'test input string ~!@#$%^&*()_+');
            done();
        })
            .catch(e => { throw e; });

        stdin.send('test input string ~!@#$%^&*()_+\r');
    });
    it('Remove last character', function (done) {
        EP().then((a) => {
            assert.equal(a, 'test input strin');
            done();
        })
            .catch(e => { throw e; });

        stdin.send('test input string\u001B[W\r');
    });
    it('Remove first character', function (done) {
        EP().then((a) => {
            assert.equal(a, 'est');
            done();
        })
            .catch(e => { throw e; });

        stdin.send('test\u001B[D\u001B[D\u001B[D\u001B[W\r');
    });
    it('Exit element', function (done) {
        EP().then((a) => {
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\u001B[3;;');
    });
});

describe('EntoliListMulti', function () {
    let l = [
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5']
    ];

    let ELM = new EntoliListMulti(l, { enterMessage: true, exitMessage: true, preventExit: true });

    it('Select first option', function (done) {
        ELM().then((a) => {
            assert.deepEqual(a, [l[0]]);
            done();
        });

        stdin.send('\r\u001B[A\r');
    });

    it('Select first and last option', function (done) {
        ELM().then((a) => {
            assert.deepEqual(a, [l[0], l[4]]);
            done();
        });

        stdin.send('\r\u001B[B\u001B[B\u001B[B\u001B[B\r\u001B[B\r');
    });

    it('Select first, deselect, select middle', function (done) {
        ELM().then((a) => {
            assert.deepEqual(a, [l[2]]);
            done();
        });

        stdin.send('\r\r\u001B[B\u001B[B\r\u001B[B\u001B[B\u001B[B\r');
    });

    it('Select first, go through, select last, overflow, deselect first, underflow, deselect last', function (done) {
        ELM().then((a) => {
            assert.deepEqual(a, []);
            done();
        });

        stdin.send('\r\u001B[B\u001B[B\u001B[B\u001B[B\r\u001B[B\u001B[B\r\u001B[A\u001B[A\r\u001B[B\r');
    });

    it('Exit element', function (done) {
        ELM().then((a) => {
            done();
        })
        .catch(e => { throw e; });

        stdin.send('\u001B[3;;');
    });
});