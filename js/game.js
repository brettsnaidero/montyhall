let gameContainer = document.querySelector('#game');
let messageTopContainer = document.querySelector('#message-top');
let messageBottomContainer = document.querySelector('#message-bottom');

let state = {
  doorsReady: true,
  selectedDoor: '',
  currentTurn: 0,
  switched: false,
  doors: [
    {
      open: false,
      selected: false,
      hasCar: false
    },
    {
      open: false,
      selected: false,
      hasCar: false
    },
    {
      open: false,
      selected: false,
      hasCar: false
    }
  ]
}

// <h3>Alrighty, you ${state.switched ? 'switched' : 'stayed'}!</h3>

// Start game button
delegate('body', 'click', '.start-game', event => {

  state.currentTurn = 1;

  // Put the car behind a random door
  let carDoor = (Math.floor(Math.random() * 3) + 1) - 1; // 0,1,2
  state.doors[carDoor].hasCar = true;

  // Render the opening message
  renderMessage(state, messageTopContainer, ``);
  renderMessage(state, messageBottomContainer, `Choose a door, any door!`);
  messageBottomContainer.parentElement.classList.add('started');

  // Render the doors
  renderDoors(state, gameContainer);

});

// Click a door
delegate('body', 'click', '.door', event => {
  if (state.currentTurn == 1) {
    state.doorsReady = false;

    state.selectedDoor = event.delegateTarget.getAttribute('data-number');

    //  Set clicked door to selected
    state.doors[state.selectedDoor].selected = true;

    // Highlight selected door
    event.delegateTarget.classList.add('selected');
    event.delegateTarget.parentElement.classList.add('fade-others');

    // After highlight animation has played, query user
    // window.setTimeout(x, 1000);
    renderMessage(state, messageBottomContainer, `<h3>Excellent choice!</h3><button class="next-step"><span>Continue</span></button>`);

    // Move to second turn immediately, so users can't select more than one
    state.currentTurn = 2;

  } else if (state.currentTurn == 2 && state.doorsReady == true) {

    state.doorsReady = false;

    let newSelectedDoor = event.delegateTarget.getAttribute('data-number');

    if (newSelectedDoor !== state.selectedDoor) {
      // Remove select from old door
      document.querySelector('.selected').classList.remove('selected');
      // Add to new door
      event.delegateTarget.classList.add('selected');
      state.switched = true;
    }

    state.currentTurn = 3;

    state.selectedDoor = newSelectedDoor;

    //  Set clicked door to selected
    state.doors[state.selectedDoor].selected = true;

    // Render the message
    renderMessage(state, messageBottomContainer, `<h3>Alrighty!</h3><button class="next-step"><span>Open your door</span></button>`);

    event.delegateTarget.parentElement.classList.add('fade-others');

  } else if (state.currentTurn == 3 && state.doorsReady == true) {
    alert('Oi, you cannot click a door now!');
  }
});

// Continue button clicked
delegate('body', 'click', '.next-step', event => {
  if (state.currentTurn == 2) {
    state.doorsReady = true;

    document.querySelector('.fade-others').classList.remove('fade-others');

    // Open a door
    let carDoor = whichDoorHasCar();
    let openMe = pickDoorToOpen(state.selectedDoor, carDoor);

    state.doors[openMe].open = true;
    document.querySelector('[data-number="' + openMe + '"]').classList.add('open');

    // Render the next message
    renderMessage(state, messageBottomContainer, `I am going to open one of the doors for you! If you want, you can take this opportunity to <strong>switch your chosen door</strong>. Just click the door you would like to choose.`);

  } else if (state.currentTurn == 3) {

    if ( state.doors[state.selectedDoor].hasCar == true ) {
      state.winOrLose = true;
      document.querySelector('[data-number="' + state.selectedDoor + '"]').classList.add('car');
    }

    document.querySelector('[data-number="' + state.selectedDoor + '"]').classList.add('open');

    state.doors[state.selectedDoor].open = true;

    // Render the next message
    renderMessage(state, messageBottomContainer, `<h3>${state.winOrLose ? 'Congrats!' : 'Bad luck!'}</h3><p>${state.winOrLose ? 'You won a new car!' : 'You go home empty handed today.'}</p>`);

  }
});

// Render the doors to start the game
function renderDoors(data, element) {
  let newView = ''
  data.doors.forEach( (item, number) => {
    newView += `<div class="door" data-number="${number}" id="door${number}"><div class="thumb"></div></div>`;
  });
  element.innerHTML = newView;
}

// Find out which door has the car door
function whichDoorHasCar() {
  let answer = '';
  state.doors.forEach( (item, number) => {
    if (item.hasCar == true) {
      console.log('Which door has car:' + number);
      answer = number;
    }
  });
  return answer;
}

// Render messages
function renderMessage(data, element, message) {
  element.innerHTML = message;
}

// Choose a remaining door that doesn't have the car, to open
function pickDoorToOpen(userChoice, carDoor) {
  openDoor = (Math.floor(Math.random() * 3) + 1) - 1;
  while (openDoor == userChoice || openDoor == carDoor) {
    openDoor = (Math.floor(Math.random() * 3) + 1) - 1;
  };
  console.log('Car door:' + carDoor);
  console.log("Userchoice: " + userChoice);
  console.log("Open: " + openDoor);
  return openDoor;
};
