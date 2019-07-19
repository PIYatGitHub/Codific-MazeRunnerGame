# Maze runner game

## Overview

This project is a command line game, which allows you to run through a maze of rooms. Each room has a specific item in
it, which you can pick up and collect in your backpack for future use. Beware, though, because the backpack can only
handle up to 50 kilos of luggage, so pick wisely not wildly. Once you get to the end of the maze, or you cannot 
go further and quit, the game is over and you could start all over again.

## Run

This project is node.js based. To use it pull up a terminal window pointing to the root of the project and simply type:
```
node app.js 
```
This will get the game up and running and you may type your command of choice.

## Commands

The game supports the following set of commands:
```
location  --> gives you the current room you are in
me        --> shows your status with room, backpack weight and health
items     --> shows all the items in your backpack
heal      --> lets you heal your character if you have a med_kit item available
quite     --> ends the game

goto --room="<name>" --key="<key>"  --> lets you go to the desired room and potentially unlock it if it is locked
pickup --item="<item>"              --> lets you pickup an item and place it in the backpack
drop   --item="<item>"              --> lets you drop an item from the backpack
```
Also, never forget that you can always run the built-in commands, such as ```help``` and ```version```. 

Enough yammering, go ahead and enjoy the game! 