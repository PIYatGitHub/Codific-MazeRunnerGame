const fs = require('fs');
const chalk = require('chalk');

const location = () => {
  let maze = load('maze'),
      runner = load('runner'),
      item = getItemInRoom(maze, runner); //# kind-of-ugly...

  console.log(chalk.yellow(`Currently you are in room: ${runner.current_room} \r\n` +
    'Available item: \r\n' +
    `${JSON.stringify(item)}`));
};

const items = () => {
 let {backpack} = load('runner');
  console.log(chalk.green(`What is in my backpack? \r\n ${JSON.stringify(backpack.items)}`));
};

const pickup = (itemType) => {
  let maze = load('maze'),
      runner = load('runner'),
      item = getItemInRoom(maze, runner);

  if (itemType === item.type) {
    if (runner.backpack.curr_weight + item.weight <= runner.backpack.max_weight) {
      runner.backpack.items.push(item);
      runner.backpack.curr_weight += item.weight;
      save(runner, 'runner');
    } else  return console.log(chalk.red(`Backpack overload by ${runner.backpack.curr_weight + item.weight - runner.backpack.max_weight} kg.`));
  } else return console.log(chalk.red(`No such item in the room...`));

  console.log(chalk.green(`What is in my backpack (after pickup)? \r\n ${JSON.stringify(runner.backpack.items)}`));
};

const drop = (itemType) => {
  let runner = load('runner'),
  removable = runner.backpack.items.find((e)=>e.type === itemType),
  index = runner.backpack.items.indexOf(removable);

  if (index >-1) {
    runner.backpack.items.splice(index,1);
    runner.backpack.curr_weight -= removable.weight;
    save(runner, 'runner');
  } else return console.log(chalk.red(`No such item in the backpack...`));
  console.log(chalk.green(`What is in my backpack (after drop)? \r\n ${JSON.stringify(runner.backpack)}`));
};


const goto = (room) => {
  console.log(chalk.green(`Going to room ${room} now...`));
  console.log(location());
};

const quite = () => {
  console.log(chalk.cyan('Shutting down... Have a nice day and come back tomorrow!'));
};

const load = (filename) => {
  //possible values of filename: maze, runner
  try{
    const dataBuff = fs.readFileSync(`JSON/${filename}.json`),
      dataJSON = dataBuff.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const save = (document, filename) => {
  const entry = JSON.stringify(document);
  fs.writeFileSync(`JSON/${filename}.json`, entry);
};

const getItemInRoom = (maze, runner) =>{
  return maze.filter((item)=>item.name===runner.current_room)[0].item
};
module.exports = {location, goto, items, pickup, drop, quite};