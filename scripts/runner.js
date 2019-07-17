const fs = require('fs');
const chalk = require('chalk');

const location = () => {
  console.log(chalk.yellow('Printing your location >>> room_92'));
};

const items = () => {
  //TODO load from json...
  let backpack = [
    {weight: 3, type:"banana"},
    {weight: 13, type:"bomb"}
    ];
  //TODO load from json...
  console.log(chalk.green(`What is in my backpack? \r\n ${JSON.stringify(backpack)}`));
};

const pickup = () => {
  let item = {weight: 1, type:"key_red"};
  //TODO -- push that new item to the json...
  let backpack = [
    {weight: 3, type:"banana"},
    {weight: 13, type:"bomb"},
    item
  ];
  console.log(chalk.green(`What is in my backpack (after pickup)? \r\n ${JSON.stringify(backpack)}`));
};

const drop = () => {

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

const load = (target) => {
  //possible values of target: maze, runner
  try{
    const dataBuff = fs.readFileSync(`JSON/${target}.json`),
      dataJSON = dataBuff.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {location, goto, items, pickup, drop, quite};