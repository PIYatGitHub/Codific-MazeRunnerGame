const yargs = require('yargs');
const runner = require('./runner');

yargs.command({
  command: 'drop',
  describe: 'you will drop the item and execute the items command',
  builder: {
    item: {
      describe: 'enum of items: [sword, bomb, banana, key_blue, key_red, key_green, med_kit]',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    runner.drop(argv.item);
  }
});

yargs.command({
  command: 'goto',
  describe: 'player will move to the exit that connects the current and selected rooms and will execute the location command',
  builder: {
    room: {
      describe: 'available: room_0 to room_23 inclusive',
      demandOption: true,
      type: 'string'
    },
    key: {
      describe: 'an item needed to enter the locked/blocked room',
      demandOption: false,
      type: 'string'
    }
  },
  handler: function (argv) {
    runner.goto(argv.room, argv.key);
  }
});

yargs.command({
  command: 'heal',
  describe: 'heals your character if you have a med_kit',
  handler: function () {
    runner.heal();
  }
});

yargs.command({
  command: 'items',
  describe: 'prints out the list of items in the backpack',
  handler: function () {
    runner.items();
  }
});

yargs.command({
  command: 'location',
  describe: 'prints out the current player location and the list of exits',
  handler: function () {
    runner.location();
  }
});

yargs.command({
  command: 'me',
  describe: 'prints out your current status with room, backpack weight and health',
  handler: function () {
    runner.me();
  }
});

yargs.command({
  command: 'pickup',
  describe: 'you will pickup the item and execute the items command',
  builder: {
    item: {
      describe: 'enum of items: [sword, bomb, banana, key_blue, key_red, key_green, med_kit]',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    runner.pickup(argv.item);
  }
});


yargs.command({
  command: 'quite',
  describe: 'quit the game',
  handler: function () {
    runner.quite();
  }
});