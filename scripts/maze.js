class Maze {
  constructor() {
    this.rooms = [
      {
        name: 'room_0',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_1', 'room_6', 'room_7'],
        blocked_exits: []
      },
      {
        name: 'room_1',
        item: {'weight': 5, 'type': 'med_kit'},
        exits: ['room_0', 'room_2', 'room_7'],
        blocked_exits: []
      },
      {
        name: 'room_2',
        item: {'weight': 1, 'type': 'key_red'},
        exits: ['room_1', 'room_8', 'room_3'],
        blocked_exits: ['room_8--key_red']
      },
      {
        name: 'room_3',
        item: {'weight': 10, 'type': 'sword'},
        exits: ['room_2', 'room_9', 'room_4'],
        blocked_exits: []
      },
      {
        name: 'room_4',
        item: {'weight': 1, 'type': 'key_blue'},
        exits: ['room_3', 'room_10', 'room_5'],
        blocked_exits: []
      },
      {
        name: 'room_5',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_4', 'room_11'],
        blocked_exits: ['room_11--key_blue']
      },
      {
        name: 'room_6',
        item: {'weight': 20, 'type': 'bomb'},
        exits: ['room_12', 'room_7'],
        blocked_exits: []
      },
      {
        name: 'room_7',
        item: {'weight': 1, 'type': 'key_green'},
        exits: ['room_6', 'room_13', 'room_8'],
        blocked_exits: []
      },
      {
        name: 'room_8',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_7', 'room_14', 'room_9'],
        blocked_exits: ['room_14--bomb']
      },
      {
        name: 'room_9',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_8', 'room_15', 'room_10'],
        blocked_exits: ['room_10--key_blue']
      },
      {
        name: 'room_10',
        item: {'weight': 20, 'type': 'bomb'},
        exits: ['room_9', 'room_16', 'room_11'],
        blocked_exits: []
      },
      {
        name: 'room_11',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_10', 'room_17'],
        blocked_exits: ['room_17--bomb']
      },
      {
        name: 'room_12',
        item: {'weight': 5, 'type': 'med_kit'},
        exits: ['room_6', 'room_18', 'room_13'],
        blocked_exits: ['room_18--key_blue']
      },
      {
        name: 'room_13',
        item: {'weight': 10, 'type': 'sword'},
        exits: ['room_12', 'room_7', 'room_14'],
        blocked_exits: []
      },
      {
        name: 'room_14',
        item: {'weight': 1, 'type': 'key_red'},
        exits: ['room_13', 'room_8', 'room_15'],
        blocked_exits: []
      },
      {
        name: 'room_15',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_14', 'room_9', 'room_16'],
        blocked_exits: ['room_16--key_blue']
      },
      {
        name: 'room_16',
        item: {'weight': 20, 'type': 'bomb'},
        exits: ['room_15', 'room_10', 'room_17'],
        blocked_exits: ['room_17--bomb']
      },
      {
        name: 'room_17',
        item: {'weight': 3, 'type': 'banana'},
        exits: ['room_16', 'room_11'],
        blocked_exits: []
      }
    ];
  }

  getItemInRoom(room) {
    return this.rooms.find((r) => r.name === room).item;
  }

  getCurrentRoom(room) {
    return this.rooms.find((r) => r.name === room);
  }

  unlockDoor(room) {
    let unlock = this.getCurrentRoom(room);
    unlock.blocked_exits.filter((e) => e.includes(room));
  };
}

module.exports = Maze;