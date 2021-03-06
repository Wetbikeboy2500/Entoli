# Entoli
[![npm version](https://img.shields.io/npm/v/entoli.svg)](https://www.npmjs.com/package/entoli) [![npm license](https://img.shields.io/npm/l/entoli.svg)](https://github.com/Wetbikeboy2500/Entoli/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dt/entoli.svg)](https://www.npmjs.com/package/entoli) [![code size](https://img.shields.io/github/languages/code-size/wetbikeboy2500/entoli.svg)](https://github.com/Wetbikeboy2500/Entoli) [![codecov](https://codecov.io/gh/Wetbikeboy2500/Entoli/branch/master/graph/badge.svg)](https://codecov.io/gh/Wetbikeboy2500/Entoli)

An interactive Cli that pays attention to detail

### Why?
There are too many 'interactive' Clis that skip over the small things. They don't hide the cursor or allow for easy expansion. It is all hardcoded with several other libraries. Entoli changes all that. Entoli is built upon a standard system that can be developed quickly and efficiently. This makes it simple to fix issues and improve overall performance. Entoli is here for the simple goal of asking the user a question.

#### Setup
```shell
npm install entoli
```
```javascript
const { EntoliList, EntoliPrompt, EntoliListMulti } = require('entoli');
```

#### Prompting Methods
##### EntoliPrompt
A simple question and answer input and output prompt.
* Input the question into the constructor of the object as a string
* The second parameter in the constructor takes a json object with enterMessage(default true), exitMessage(default true),and preventExit (default false)

enterMessage - display answer when prompt is confirmed

exitMessage - display 'Exited the object' when Ctrl+C is pressed

preventExit - stops process.exit from being called
* Returns the input of the user
###### Example
```javascript
const { EntoliPrompt } = require('entoli');

let EP = new EntoliPrompt('How is your day?');

EP().then((a) => {
    console.log(a);
});
```
or
```javascript
const { EntoliPrompt } = require('entoli');

//with all optional parameters set to opposite of default
let EP = new EntoliPrompt('How is your day?', { enterMessage: false, exitMessage: false, preventExit: true });

EP().then((a) => {
    console.log(a);
});
```

![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture3.png "Prompt")
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture4.png "Output")

###### Issues
* The wrote part is sometimes on a new line than where the input was given
##### EntoliList
A simple list where a user can choose an option.
* Input a list of arrays to the constructor of the object with a name/value pair per array
* The second parameter in the constructor takes a json object with enterMessage(default true), exitMessage(default true),and preventExit (default false)

enterMessage - display answer when prompt is confirmed

exitMessage - display 'Exited the object' when Ctrl+C is pressed

preventExit - stops process.exit from being called
* Returns a function that, when ran, prompts the user to choose an item from the list
* The function returns a promise of the users response. The response is a single array with name/value pair.
###### Example
```javascript
const { EntoliList } = require('entoli');

let EL = new EntoliList([
    ['Name 1', 'Value 1'],
    ['Name 2', 'Value 2']
]);

EL().then((a) => {
    console.log(a);
});
```
or
```javascript
const { EntoliList } = require('entoli');

//with all optional parameters set to opposite of default
let EL = new EntoliList([
    ['Name 1', 'Value 1'],
    ['Name 2', 'Value 2']
], { enterMessage: false, exitMessage: false, preventExit: true });

EL().then((a) => {
    console.log(a);
});
```


![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture.png "Prompt")
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture2.png "Output")

###### Issues
* If the list is longer than the console, there can be weird updates happening as the list is scrolled through
##### EntoliListMulti
A simple multi-select repsonse from a list.
* Input a list of arrays to the constructor of the object with a name/value pair per array
* The second parameter in the constructor takes a json object with enterMessage(default true), exitMessage(default true),and preventExit (default false)

enterMessage - display answer when prompt is confirmed

exitMessage - display 'Exited the object' when Ctrl+C is pressed

preventExit - stops process.exit from being called
* Returns a function that, when ran, prompts the user to choose multiple items from the list
* The function returns a list of arrays with the name/value pairs per array
###### Example
```javascript
const { EntoliListMulti } = require('entoli');

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
```
or
```javascript
const { EntoliListMulti } = require('entoli');

//with all optional parameters set to opposite of default
let ELM = new EntoliListMulti([
    ['Name 1', 'Value 1'],
    ['Name 2', 'Value 2'],
    ['Name 3', 'Value 3'],
    ['Name 4', 'Value 4'],
    ['Name 5', 'Value 5'],
], { enterMessage: false, exitMessage: false, preventExit: true });

ELM().then((a) => {
    console.log(a);
});
```

![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture5.png "Prompt")
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture6.png "Output")

#### Inner Design
The following is extremely technical with the design and process of creating and managing a prompt.

As I have written before, this is meant to be easy to build upon and make more prompts in the future. The current system has 3 layers. The two lowest are the EntoliOutput file and the RntoliInterface file. These both export a class to their respective file names. EntoliOutput's constructor takes in attributes in the form of a list of arrays in key/value pair. These are the base values that the EntoliOutput object stores in its own map. A setup function can then be called to pass a template to the EntoliOutput object. The template is a list of arrays. Each array in the list is treated as a new line. These lines are individually updated and rendered to make the EntoliOutput more efficient. These arrays can also have functions which can call the values stored in the EntoliOutput object using the get method. This is the basic setup of EntoliOutput.
EntoliOutput is only for keeping track and updating what is outputted. There are no events handled by EntoliOutput. This is where EntoliInterface comes into play. EntoliInterface allows the optional function of update, enter, preenter, and exit with the boolean hideCursor to be passed to it. These are all optional but only preenter and hideCursor have defaults of null and true respectively. EntoliInterface is used inside of the prompt class that is being made. Examples are the EntoliList class and the SimpleEntoliPrompt class. These classes work in the form of passing the base prompts and returning a function with a promise inside. This all happens within the constructor. Inside the promise is where the real work is done. This is where EntoliOutput and EntoliInterface are made and managed. First, EntoliOutput is created and setup. Then, EntoliInterface is setup. There are also permanent values of the prompt stored outside of the prompt return function as final values. The values that are initialized inside the function but before the promise are values that need to be reset every time the prompt is requested. The exit and enter arguments of EntoliInterface both start by calling the exit method of EntoliOuput. This ensures that there is no more updating or output from it to the console. If there needs to be a change or update to the console before the enter event, then use the preenter event to update EntoliOutput. There is also a resolve for the promise with the value that should be called inside the enter event. The final event is the update event. This is passed a string as the first argument and a key as the second. Update is called every time a key is pressed. Key.name is the name of the key and string is the actual string that should be put into the console. String is undefined if it is not a key that has output like the arrow keys. This is where logic can be added into the prompt and can control many things based off the template passed to EntoliOutput. This is where the update method of EntoliOutput can be called with the key/value pair in a list of arrays. This causes EnotoliOutput to update and rerender the lines that change based on the values of the map values. This is the basic flow of the program. These classes for the prompts put into the exports.js file in the dist directory. That is where babel outputs its build.

Reference EntoliList.js and SimpleEntoliPrompt.js to see the design of the prompts better.
