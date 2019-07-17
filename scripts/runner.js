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
    } else  {
      return console.log(chalk.red(`Backpack overload by ${runner.backpack.curr_weight + item.weight - runner.backpack.max_weight} kg.`))
    }
  } else {
    return console.log(chalk.red(`No such item in the room...`))
  }

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

  console.log(exit_match);

 if (exit_match) {
    if(blocked_exit && !key){
      console.log(chalk.red(`Cannot go to room ${room}. Exit is blocked with ${blocker}! Lookup
      your backpack to see if you have a solution.`));
    } else if(key === blocker){
      let match =runner.backpack.items.find((item)=>item.type===key),
          index = runner.backpack.items.indexOf(match);
      if (match) {
        runner.backpack.items.splice(index,1);
        runner.backpack.curr_weight -= match.weight;
        runner.current_room = room;
        //TODO if necessary also update the blocked exits by removing the one at hand so it remains open at all times
        save(runner, 'runner');
        console.log(chalk.green(`Going to room ${room} now...`));
        console.log(location());
        winner(room);
      }
    }
     if (!blocker) {
       runner.current_room = room;
       save(runner, 'runner');
       console.log(chalk.green(`Going to room ${room} now...`));
       console.log(location());
       winner(room)
     }
 } else {
   return console.log(chalk.red(`Cannot go to room ${room}.`))
 }
};

const quite = () => {
  console.log(chalk.cyan('Shutting down... Have a nice day and come back tomorrow!'));
};

const winner = (room) => {
  if (room === "room_17"){
     return console.log(chalk.brightGreen('Hurra! You won the maze run... What a game it was, huh?'))
  }
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