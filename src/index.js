const { EntoliList, EntoliPrompt, EntoliListMulti } = require('../dist/exports.js');

let EP = new EntoliPrompt('How is your day?');

EP().then((a) => {
    console.log(a);
});