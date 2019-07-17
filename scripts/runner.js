const fs = require('fs');
const chalk = require('chalk');

const drop = (itemType) => {
  let runner = load('runner'),
    removable = runner.backpack.items.find((e)=>e.type === itemType),
    index = runner.backpack.items.indexOf(removable);

  if (index >-1) {
    runner.backpack.items.splice(index,1);
    runner.backpack.curr_weight -= removable.weight;
    save(runner, 'runner');
  } else {
    return console.log(chalk.red(`No such item in the backpack...`))
  }
  console.log(chalk.green(`What is in my backpack (after drop)? \r\n ${JSON.stringify(runner.backpack)}`));
};

const goto = (room, key) => {
  let maze = load('maze'),
    runner = load('runner'),
    curr_room = maze.find((e)=>e.name === runner.current_room),
    exit_match = curr_room.exits.includes(room),
    blocked_exit = curr_room.blocked_exits.find((b)=>b.includes(`${room}--`)),
    blocker;

  if (blocked_exit) {
    blocker = blocked_exit.split('--')[1];
  }
  if (exit_match) {
    if (!blocker) {
      moveAlong(runner, room)
    }
    attemptUnlock(blocker, key, runner, room);
  } else {
    return console.log(chalk.red(`Cannot go to ${room}.`))
  }
};

const heal = () => {
  let runner = load('runner'),
    med_kit = runner.backpack.items.find((i) => i.type === 'med_kit'),
    index = runner.backpack.items.indexOf(med_kit);

  if (index > -1) {
    runner.backpack.items.splice(index, 1);
    runner.backpack.curr_weight -= med_kit.weight;
    runner.health +=10;
    console.log(chalk.green.underline('Using med_kit... health up by 10 pts.'));
    save(runner, 'runner');
  } else {
    console.log(chalk.red('Could not find med_kit...'));
  }
};

const items = () => {
  let {backpack} = load('runner');
  console.log(chalk.green(`What is in my backpack? \r\n ${JSON.stringify(backpack.items)}`));
};

const location = () => {
  let maze = load('maze'),
      runner = load('runner'),
      item = getItemInRoom(maze, runner);

  console.log(chalk.yellow(`Currently you are in room: ${runner.current_room} \r\n` +
    'Available item: \r\n' +
    `${JSON.stringify(item)}`));
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
    } else  {
      return console.log(chalk.red(`Backpack overload by ${runner.backpack.curr_weight + item.weight - runner.backpack.max_weight} kg. Cannot pick up.`))
    }
  } else {
    return console.log(chalk.red(`No such item in the room...`))
  }

  console.log(chalk.green(`What is in my backpack (after pickup)? \r\n ${JSON.stringify(runner.backpack.items)}`));
};


const quite = () => {
  console.log(chalk.cyan('Shutting down... Have a nice day and come back tomorrow!'));
};

//helper functions
const attemptUnlock = (blocker, key, runner, room) => {
  if(blocker && !key){
    console.log(chalk.red(`Cannot go to ${room}. Exit is blocked with ${blocker}! Lookup
      your backpack to see if you have a solution.`));
  } else if(key === blocker){
    let match = runner.backpack.items.find((item)=>item.type===key),
      index = runner.backpack.items.indexOf(match);
    if (match) {
      runner.backpack.items.splice(index,1);
      runner.backpack.curr_weight -= match.weight;
      runner.current_room = room;
      reduceHealth(runner, room);
      moveAlong(runner, room);
    }
  }else {
    return console.log(chalk.red(`No such item in the backpack...`))
  }
};

const getItemInRoom = (maze, runner) => maze.filter((item)=>item.name===runner.current_room)[0].item;

const load = (filename) => {
  try{
    const dataBuff = fs.readFileSync(`JSON/${filename}.json`),
      dataJSON = dataBuff.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const moveAlong = (runner, room) => {
  reduceHealth(runner, room);
  runner.current_room = room;
  save(runner, 'runner');
  console.log(chalk.green(`Going to ${room} now...`));
  console.log(location());
  winner(room);
};

const reduceHealth = (runner, room)=> {
  let diff = room.split('_')[1]-runner.current_room.split('_')[1];

  if (diff>=0 && diff <=3 || diff === -1) {
    runner.health -=10;
  } else if(diff>4 && diff<8) {
    runner.health-=20;
  } else {
    return console.log(chalk.red(`No clipping in space allowed...`))
  }
};

const save = (document, filename) => {
  const entry = JSON.stringify(document);
  fs.writeFileSync(`JSON/${filename}.json`, entry);
};

const winner = (room) => {
  if (room === "room_17"){
    return console.log(chalk.green('Hurra! You won the maze run... What a game it was, huh?'))
  }
};

module.exports = {drop, goto, heal, items, location, pickup, quite};