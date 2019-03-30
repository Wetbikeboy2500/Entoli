import EntoliList from './EntoliList';
import SimpleEntoliPrompt from './SimpleEntoliPrompt';

let d = new SimpleEntoliPrompt('Hello?');
let p = new EntoliList([
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => { //cool things with lists and maps for options
        return [`Option ` + a, () => helo(a)];
    })
]);

d().then(b => {
    console.log(b);
});