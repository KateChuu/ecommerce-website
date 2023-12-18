function hitEnter1(event) {
    console.log(event.key);
    if(event.key === 'Enter') {
        const name = document.querySelector('.js-input').value;
        document.querySelector('.js-name').innerHTML = `your name is ${name}`;
    }
}
function submit() {
    const name = document.querySelector('.js-input').value;
    document.querySelector('.js-name').innerHTML = `your name is ${name}`;
}

function subscribe() {
    const button = document.querySelector('.js-subscribe-button');
    // if use innerText, it's ok to include space
    // if use innerHTML, the text should be exact the same 
    if (button.innerText === 'Subscribe') {
        button.innerText = 'Subscribed';
        // add a class after subscribing to type the button
        // notice that there is no dot in front of the class name
        button.classList.add('is-subscribed');
    }else {
        button.innerText = 'Subscribe';
        // remove the class after cancelling subscription
        button.classList.remove('is-subscribed');
    }
}

function hitEnter2(event) {
    console.log(event.key);
    if(event.key === 'Enter') {
        calculate();
    }
}

function calculate() {
    // the data type of the values we get from the DOM is always string
    // so we have to convert the value into a number
    let cost = Number(document.querySelector('.js-cost').value);
    if (cost < 0) {
        document.querySelector('.js-result').innerHTML = 'Cost must > 0, please re-enter cost.';
    }else {
        if (cost < 40) {
            cost += 10;
        }
        document.querySelector('.js-result').innerHTML = `Total cost: $${cost}`;            
    }
}
function clicked(name) {
    const button = document.querySelector(name);
    if (!button.classList.contains('is-toggled')) {
        turnOff();
        button.classList.add('is-toggled');
    } else {
        button.classList.remove('is-toggled');
    }
}
function turnOff() {
    const button = document.querySelector('.is-toggled');
    if(button) {
        button.classList.remove('is-toggled');
    }
}