# Entoli
An interactive Cli that pays attention to detail

### Why?
There are too many 'interactive' Clis that skip over the small things. They don't hide the cursor or allow for easy expansion. It is all hardcoded with several other libraries. Entoli changes all that. Entoli is built upon a standard system that can be developed quickly and efficiently. This makes it simple to fix issues and improve overall performance. Entoli is here for the simple goal of asking the user a question.

#### Setup
```shell
npm install entoli
```
```javascript
const { EntoliList, EntoliPrompt } = require('entoli');
```

#### Prompting Methods
##### EntoliList
A simple list where a user can choose an option.
* Input an array like map to the constructor of the object with a name, value pair
* Returns a fucntion that, when ran, returns a promise which will resolve with the name, value pair in an array
###### Example
```javascript
const { EntoliList } = require('entoli');

let EL = new EntoliList([
    ['Name 1', 'Key 1'],
    ['Name 2', 'Key 2']
]);

EL().then((a) => {
    console.log(a);
});
```
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture.png "Prompt")
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture2.png "Output")

###### Issues
* If the list is longer than the console, there can be weird updates happening as the list is scrolled through
##### EntoliPrompt
A simple question and answer input and output prompt.
* Input the question into the construcotr of the object as a string
* Returns the input of the user
###### Example
```javascript
const { EntoliPrompt } = require('entoli');

let EP = new EntoliPrompt('How is your day?');

EP().then((a) => {
    console.log(a);
});
```
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture3.png "Prompt")
![alt text](http://u.cubeupload.com/wetbikeboy2500/Capture4.png "Output")

###### Issues
* The wrote part is repetitive and may be made optional in the future

#### Inner Design
The following is extremely technical with the design and process of creating and managing a prompt.

As I have written before, this is meant to be easy to build upon and make more prompts in the future. The current system has 3 layers. The two lowest are the EntoliOutput file and the RntoliInterface file. These both export a class to their respective file names. EntoliOutput's constructor takes in attributes in the form of a list of arrays in key/value pair. These are the base values that the EntoliOutput object stores in its own map. A setup function can then be called to pass a template to the EntoliOutput object. The template is a list of arrays. Each array in the list is treated as a new line. These lines are individually updated and rendered to make the EntoliOutput more efficient. These arrays can also have functions which can call the values stored in the EntoliOutput object using the get method. This is the basic setup of EntoliOutput.
EntoliOutput is only for keeping track and updating what is outputted. There are no events handled by EntoliOutput. This is where EntoliInterface comes into play. EntoliInterface allows the optional function of update, enter, preenter, and exit with the boolean hideCursor to be passed to it. These are all optional but only preenter and hideCursor have defaults of null and true respectively. EntoliInterface is used inside of the prompt class that is being made. Examples are the EntoliList class and the SimpleEntoliPrompt class. These classes work in the form of passing the base prompts and returning a function with a promise inside. This all happens within the constructor. Inside the promise is where the real work is done. This is where EntoliOutput and EntoliInterface are made and managed. First, EntoliOutput is created and setup. Then, EntoliInterface is setup. There are also permanent values of the prompt stored outside of the prompt return function as final values. The values that are initialized inside the function but before the promise are values that need to be reset every time the prompt is requested. The exit and enter arguments of EntoliInterface both start by calling the exit method of EntoliOuput. This ensures that there is no more updating or output from it to the console. If there needs to be a change or update to the console before the enter event, then use the preenter event to update EntoliOutput. There is also a resolve for the promise with the value that should be called inside the enter event. The final event is the update event. This is passed a string as the first argument and a key as the second. Update is called every time a key is pressed. Key.name is the name of the key and string is the actual string that should be put into the console. String is undefined if it is not a key that has output like the arrow keys. This is where logic can be added into the prompt and can control many things based off the template passed to EntoliOutput. This is where the update method of EntoliOutput can be called with the key/value pair in a list of arrays. This causes EnotoliOutput to update and rerender the lines that change based on the values of the map values. This is the basic flow of the program. These classes for the prompts put into the exports.js file in the dist directory. That is where babel outputs its build.

Reference EntoliList.js and SimpleEntoliPrompt.js to see the design of the prompts better.