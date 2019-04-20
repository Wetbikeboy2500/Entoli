const stdin = require('mock-stdin').stdin();
const assert = require('chai').assert;
const { EntoliList, EntoliPrompt, EntoliListMulti, EntoliDivider, EntoliIndent } = require('../dist/exports');

require('events').EventEmitter.defaultMaxListeners = 15;

//TODO: build tests for post creation of objects
//TODO: create tests for EntoliIndent and EntoliDivider

describe('EntoliList', function () {
    let l = [
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5']
    ];

    let El = new EntoliList(l, { enterMessage: false, exitMessage: false, preventExit: true });
    it('Select first element', function (done) {
        El().then((a) => {
            assert.equal(a, l[0]);
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\r');
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
    let EP = new EntoliPrompt("Test", { enterMessage: false, exitMessage: false, preventExit: true });
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
    it('Remove last space going left and right twice from end of string', function (done) {
        EP().then((a) => {
            assert.equal(a, 'test');
            done();
        })
            .catch(e => { throw e; });

        stdin.send('test \u001B[D\u001B[C\u001B[C\u001B[W\r');
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
    let dividerList = [
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        EntoliDivider,
        ['4', '4'],
        ['5', '5']
    ];

    let ELM = new EntoliListMulti(l, { enterMessage: false, exitMessage: false, preventExit: true });
    let ELMD = new EntoliListMulti(dividerList, { enterMessage: false, exitMessage: false, preventExit: true });

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

    it('Select first option with divider', function (done) {
        ELMD().then((a) => {
            assert.deepEqual(a, [dividerList[0]]);
            done();
        });

        stdin.send('\r\u001B[A\r');
    });

    it('Select first and last option with divider', function (done) {
        ELMD().then((a) => {
            assert.deepEqual(a, [dividerList[0], dividerList[5]]);
            done();
        });

        stdin.send('\r\u001B[B\u001B[B\u001B[B\u001B[B\r\u001B[B\r');
    });

    it('Exit element', function (done) {
        ELM().then((a) => {
            done();
        })
            .catch(e => { throw e; });

        stdin.send('\u001B[3;;');
    });
});