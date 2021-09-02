const { EntoliListMulti } = require('../dist/exports.js');

let EL = new EntoliListMulti([
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5']
]);
let ELM_Output = new EntoliListMulti([['1', '1'],
['2', '2'],
['3', '3'],
['4', '4'],
['5', '5']], { enterMessage: true, exitMessage: true, preventExit: false });
EL({ exitmessage: false }).then((a) => {
    console.log(a);
});