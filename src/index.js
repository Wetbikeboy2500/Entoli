import EntoliPrompt from './SimpleEntoliPrompt';
import EntoliList from './EntoliList';
import EntoliListMulti from './EntoliListMulti';

let El = new EntoliPrompt('h');

El().then((a) => {
    console.log(a);
    
    let EL = new EntoliList([
        ['Name 1', 'Value 1'],
        ['Name 2', 'Value 2']
    ]);
    
    EL().then((a) => {
        console.log(a);
        
        let ELM = new EntoliListMulti([
            ['Name 1', 'Value 1'],
            ['Name 2', 'Value 2'],
            ['Name 3', 'Value 3'],
            ['Name 4', 'Value 4'],
            ['Name 5', 'Value 5'],
        ]);
        
        ELM().then((a) => {
            console.log(a);
        });
    });
    
});



