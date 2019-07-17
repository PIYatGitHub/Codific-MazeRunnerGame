const fs = require('fs');
const chalk = require('chalk');

const location = () => {
  let maze = load("maze");
  console.log('DEBUG....');
  console.log(maze[0]);
  console.log('DEBUG....');


  let item = {weight: 5, type:"med_kit"};
  console.log(chalk.yellow('Printing your location >>> room_24 \r\n' +
    'What is in room_24? \r\n' +
    `${JSON.stringify(item)}`));
};

const items = () => {
  //TODO load from json...
  let backpack = [
    {weight: 3, type:"banana"},
    {weight: 20, type:"bomb"}
    ];
  //TODO load from json...
  console.log(chalk.green(`What is in my backpack? \r\n ${JSON.stringify(backpack)}`));
};

const pickup = (itemType) => {
  let item = {weight: 1, type:itemType};
  //TODO -- push that new item to the json...
  let backpack = [
    {weight: 3, type:"banana"},
    {weight: 20, type:"bomb"},
    item
  ];
  console.log(chalk.green(`What is in my backpack (after pickup)? \r\n ${JSON.stringify(backpack)}`));
};

const drop = (itemType) => {

  //TODO push that update to the json...
  let backpack = [
    {weight: 3, type:"banana"}
  ];
  //TODO load from json...
  console.log(chalk.green(`What is in my backpack (after drop)? \r\n ${JSON.stringify(backpack)}`));
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

module.exports = {location, goto, items, pickup, drop, quite};