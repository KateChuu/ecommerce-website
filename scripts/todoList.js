const todoList = [];
// insert some default values
todoList.push(
    {item: 'dinner', date: '2023-12-04'},
    {item: 'afternoon tea', date: '2023-12-06'});

display();

// the second way
document.querySelector('.js-add-button').addEventListener('click', () => {
    add();
});

function add() {
    const itemInput = document.querySelector('.js-item-input');
    const dateInput = document.querySelector('.js-date-input');
    const item = itemInput.value;
    const date = dateInput.value;
    todoList.push({item, date});

    // empty the input box
    itemInput.value = '';
    dateInput.value = '';
    display();
}

function display() {
    let list = '';

    // another way of writing for loop below
    todoList.forEach(
        function(value, index) {
            const { item, date } = value;
            list += `
            <div>${item}</div>
            <div>${date}</div>
            <div><button class="delete-button" onclick="
                todoList.splice(${index}, 1);
                display();
                ">delete</button>
            </div>`;
        } 
    )
    // for(let i = 0; i < todoList.length; ++i) {
    //     // a shortcuts way
    //     const { item, date} = todoList[i];
    //     list += `
    //     <div>${item}</div>
    //     <div>${date}</div>
    //     <div><button class="delete-button" onclick="
    //         todoList.splice(${i}, 1);
    //         display();
    //         ">delete</button>
    //     </div>`;
    // }
    
    document.querySelector('.js-item-div').innerHTML = list;
}
