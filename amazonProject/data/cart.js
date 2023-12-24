import { products } from "./products.js";

// export variables and functions so we can use them in other files
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryId: '1'
    }, {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryId: '2'
    }];
};

function saveToStorage() {
    // localStorate.setItem(the name we want to use in the local storage, string)
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(id) {
    // loop through cart to check the product is in the cart or not
    let match;
    cart.forEach((product) => {
        if(product.id === id) {
            match = product;
        }
    });
    // the item is already in the cart, so we increase the quantity
    if(match) {
        match.quantity += 1;
    }else { // the item is not in the cart yet
        cart.push({
            id: id,
            quantity: 1,
            deliveryId: '1' // for new product in the cart, the delivery option is 1 by default
        });
    } 
    console.log(cart);
    saveToStorage();      
}

export function removeFromCart(id) {
    // create a new array and add everything in the cart except for the product we want to delete
    const newCart = [];
    cart.forEach((item) => {
        if(item.id !== id) {
            newCart.push(item);
        }
    });
    cart = newCart;
    saveToStorage();
}