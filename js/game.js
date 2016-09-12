// Monty Hall
// Variables to keep track of score
// let switchWins = 0;
// let switchLoss = 0;
// let noSwitchWins = 0;
// let noSwitchLoss = 0;
//
// // Game Variables
// let inGame = false;
// let currentTurn = 0;
//
// // Object for the doors
// let doors = {
//   [
//     open: false,
//     hasCar: false
//   ],
//   [
//     open: false,
//     hasCar: false
//   ],
//   [
//     open: false,
//     hasCar: false
//   ]
// };
//
// // Put the car behind a random door
// carDoor = (Math.floor(Math.random() * 3) + 1) - 1; // 0,1,2
// // doors[carDoor] = 'A new car!';
//
// // Put goats behind the remaining doors
// let i = 0;
// while (i < 3) {
//   if (i != carDoor) {
//     doors[i] = 'An old goat!';
//   };
//   i++;
// };
//
// // Separate array for which doors are open
// openDoors = [
//   false,
//   false,
//   false
// ];
//
// return res.reply(
//   "Welcome to the Monty Hall game! " +
//   "In front of you, you see three closed doors. " +
//   "Behind two of them are old goats, but behind one of them is a brand spanking new car! " +
//   "All you need to do is choose the correct door to win that car. " +
//   "Alrighty, choose a door between 1 and 3 (Format: 'Door #'). " +
//   "http://brettsnaidero.com/assets/Uploads/doors/0-doors.png"
// );


function openDoor(field) {
    field.children[0].className = 'thumb thumbOpened';
}
