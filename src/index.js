import { EntoliList } from './EntoliList';

//might look werid but I like this design
let p = new EntoliList([
    ...[1,2,3,4,5,6,7,8,9].map((a) => { //cool things with lists and maps for options
        return [`Option ` + a, () => helo(a)];
    })
]);
p.start().then(a => {
    a();
});

function helo (i) {
    console.log('helo' + i);
}