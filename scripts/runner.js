const chalk = require(`chalk`);
const Maze = require(`./maze`);

class Runner {
  constructor() {
      if(! Runner.instance){
        this.health = 100;
        this.backpack = {
          max_weight : 50,
          current_weight: 0,
          items:[]
        };
        this.current_room = `room_0`;
        this.maze = new Maze();
        Runner.instance = this;
      }
      return Runner.instance;
  }

  attemptUnlock (key, blocker, room) {
    if(key === blocker){
      let match = this.backpack.items.find((item)=>item.type===key),
        index = this.backpack.items.indexOf(match);
      if (match) {
        this.backpack.items.splice(index,1);
        this.backpack.curr_weight -= match.weight;
        this.current_room = room;
        this.moveAlong(room);
        return true;
      }
    }else {
      return false;
    }
  }

  drop (itemType) {
    let removable = this.backpack.items.find((e)=>e.type === itemType),
        index = this.backpack.items.indexOf(removable);
    if (index >-1) {
      this.backpack.items.splice(index,1);
      this.backpack.current_weight -= removable.weight;
    } else {
      return console.log(chalk.red(`No such item in the backpack...`))
    }
    console.log(chalk.green(`What is in my backpack (after drop)?\r\n${JSON.stringify(this.backpack)}`));
  };

  goto  (room, key) {
    let curr_room = this.maze.getCurrentRoom(this.current_room),
      exit_match = curr_room.exits.includes(room),
      blocked_exit = curr_room.blocked_exits.find((b)=>b.includes(`${room}--`)),
      blocker = blocked_exit?blocked_exit.split(`--`)[1]:``;

    if (!exit_match) {
      return console.log(chalk.red(`Cannot go to ${room}.`))
    }

    if (blocked_exit && !key) {
      console.log(chalk.red(`Cannot go to ${room}. Exit is blocked with ${blocker}! Lookup
      your backpack to see if you have a solution.`));
    }else if(key) {
      if (blocker) {
        let unlocked = this.attemptUnlock(key, blocker, room);
        if (unlocked) {
          console.log(chalk.green(`Door unlocked successfully...`));
          this.maze.unlockDoor();
        } else {
          console.log(chalk.red(`No such item in the backpack...`))
        }
      }
    }else {
      this.moveAlong(room)
    }
  };

  heal () {
    let med_kit = this.backpack.items.find((i) => i.type === `med_kit`),
        index = this.backpack.items.indexOf(med_kit);
    if (index > -1) {
      this.backpack.items.splice(index, 1);
      this.backpack.current_weight -= med_kit.weight;
      this.health +=10;
      console.log(chalk.green.underline(`Using med_kit... health up by 10 pts.`));
    } else {
      console.log(chalk.red(`Could not find med_kit...`));
    }
  };

  items () {
    console.log(chalk.green(`What is in my backpack?\r\n${JSON.stringify(this.backpack.items)}`));
  };

  location () {
    let item = this.maze.getItemInRoom(this.current_room);
    console.log(chalk.yellow(`Currently you are in: ${this.current_room}\r\nAvailable item: ${JSON.stringify(item)}`));
  };

  me () {
    console.log(chalk.cyan(`location: ${this.current_room}, backpack weight: ${this.backpack.current_weight}, heath: ${this.health}`));
  };

  pickup (itemType) {
    let item = this.maze.getItemInRoom(this.current_room);
    if (itemType === item.type) {
      if (this.backpack.current_weight + item.weight <= this.backpack.max_weight) {
        this.backpack.items.push(item);
        this.backpack.current_weight += item.weight;
      } else  {
        return console.log(chalk.red(`Backpack overload by ${this.backpack.current_weight + item.weight - this.backpack.max_weight} kg. Cannot pick up.`))
      }
    } else {
      return console.log(chalk.red(`No such item in the room...`))
    }
    console.log(chalk.green(`What is in my backpack (after pickup)?\r\n${JSON.stringify(this.backpack.items)}`));
  };

  quite () {
    this.resetRunner();
    console.log(chalk.cyan(`Shutting down... Have a nice day and come back tomorrow!`));
    process.exit(1);
  };

  moveAlong (room) {
    this.reduceHealth(room);
    this.current_room = room;
    console.log(chalk.green(`Going to ${room} now...`));
    console.log(this.location());
    this.winner(room);
  };

   reduceHealth  (room) {
    let diff = room.split('_')[1]-this.current_room.split('_')[1];
    if (diff>=0 && diff <=3 || diff === -1) {
      this.health -=10;
    } else if(diff>4 && diff<8) {
      this.health-=20;
    } else {
      return console.log(chalk.red(`No clipping in space allowed...`))
    }
  };

  winner (room)  {
    if (room === `room_17`){
      console.log(chalk.green(`Hura and huza! You won the maze run... What a game it was, huh?`));
      process.exit(1);
    }
  };
}
const instance = new Runner();
module.exports = instance;