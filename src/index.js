const { EntoliList } = require('../dist/exports.js');

let EP = new EntoliList([
    ['v', 'c'],
    ['h', 'c']
])

EP().then((a) => {
    console.log(a);
});