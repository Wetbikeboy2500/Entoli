const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        if (key.name == "up" || key.name == "down") {
            if (i == 0) {
                i = 1;
            } else {
                i = 0;
            }
            printProgress(key.name);
        }

        if (key.name == "enter") {
            process.exit(0);
        }
    }
});
console.log('Press any key...');

let resetting = false;

let t = 0;

let i = 0;


//TODO: Make a refresh rate that decreases the more it refreshes to limit stuck keys and trying to push the system
function printProgress (key) {
    if (!resetting) {
        resetting = true;
        if (t != 0) {
            process.stdout.moveCursor(0, -3);
        }

        t = 1;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(
            `Select an option: \n ${i}) Hello world \n ${i + 1}) Exit \n Last key pressed: ${key}`
        );
        process.stdout.cursorTo(0);//this makes the cursor look so much better than having weird midplaced selector
        setTimeout(() => {
            resetting = false;
        }, 100);
    }
}

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> '
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});*/