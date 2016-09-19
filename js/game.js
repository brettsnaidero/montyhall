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

function resetState() {
  state = {
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
}

// Start game button
delegate('body', 'click', '.start-game', event => {

  state.currentTurn = 1;

  // Put the car behind a random door
  let carDoor = (Math.floor(Math.random() * 3) + 1) - 1; // 0,1,2
  state.doors[carDoor].hasCar = true;

  // Render the opening message
  renderMessage(state, messageTopContainer, ``);
  renderMessage(state, messageBottomContainer, `<h3>Hi! I'm Monty Hall.</h3><p>Behind one of these door lies a brand spanking new car, and it could be yours if you choose the right one! Choose a door, any door!</p>`);
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
    renderMessage(state, messageBottomContainer, `<h3>Alrighty!</h3><p>${state.switched ? 'You decided to switch. Excellent choice.' : 'You decided to stay put.'}</p><button class="next-step"><span>Open your door</span></button>`);

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
    renderMessage(state, messageBottomContainer, `I am going to open one of the <strong>empty</strong> doors for you! If you want, you can take this opportunity to <strong>switch your chosen door</strong>. Just click the door you would like to choose.`);

  } else if (state.currentTurn == 3) {

    if ( state.doors[state.selectedDoor].hasCar == true ) {
      state.winOrLose = true;
      document.querySelector('[data-number="' + state.selectedDoor + '"]').classList.add('car');
    }

    document.querySelector('[data-number="' + state.selectedDoor + '"]').classList.add('open');

    state.doors[state.selectedDoor].open = true;

    // Render the next message
    renderMessage(state, messageBottomContainer, `<h3>${state.winOrLose ? 'Congrats!' : 'Bad luck!'}</h3><p>${state.winOrLose ? 'You won a new car!' : 'You go home empty handed today.'}</p><button class="next-step"><span>Start again?</span></button>`);

    state.currentTurn++;

  } else if (state.currentTurn == 4) {
    // Reset the state variables to start a new game
    resetState();

    // Render the next message
    renderMessage(state, messageBottomContainer, ``);
    // Render the next message
    renderMessage(state, messageTopContainer, `<div class="message-info">
			<h1>Welcome to the Monty Hall Problem!</h1>
			<p>The Monty Hall Problem gets its name from the TV game show, Let's Make A Deal, hosted by Monty Hall 1. The scenario is such: you are given the opportunity to select one closed door of three, behind one of which there is a prize. Once you have made your selection, Monty Hall will open one of the remaining doors, revealing that it does not contain the prize 2. He then asks you if you would like to switch your selection to the other unopened door, or stay with your original choice.</p>
			<button class="start-game">
				<span>Start Game</span>
			</button>
		</div>`);

    // Clear the game screen
    messageBottomContainer.parentElement.classList.remove('started');
    gameContainer.classList.remove('fade-others');
    gameContainer.innerHTML = '';
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
  let openDoor = (Math.floor(Math.random() * 3) + 1) - 1;
  while (openDoor == userChoice || openDoor == carDoor) {
    openDoor = (Math.floor(Math.random() * 3) + 1) - 1;
  };
  return openDoor;
};
