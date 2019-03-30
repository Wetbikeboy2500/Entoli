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
As I have wrote before, this is meant to be easy to build upon and make more prompts in the future. The current system has 3 layers. The two lowest are the EntoliOutput file and the RntoliInterface file. These both export a class to their respective file names. EntoliOutput's constructor takes in attributes in the form of a list of arrays in key/value pair. These are the base values that the EntoliOutput object stores in its own map. A setup function can then be called to pass a template to the EntoliOutput object. The termplate is a list of arrays. Each array in the list is treated as a new line. These lines are individually updated and rendered to make the EntoliOutput more efficent. These arrays can also have functions which can call the values stored in the EntoliOutput object using the get method. This is the basic setup of EntoliOutput.
EntoliOutput is only for keeping track and updating what is outputted. There are no events handled by EntoliOutput. This is where EntoliInterface comes into play. EntoliInterface allows the optional function of update, enter, preenter, and exit with the boolean hideCursor to be passed to it. These are all optional but only preenter and hideCursor have defaults of null and true respectively. EntoliInterface is used inside of the prompt class that is being made. Examples are the EntoliList class and the SimpleEntoliPrompt class. 