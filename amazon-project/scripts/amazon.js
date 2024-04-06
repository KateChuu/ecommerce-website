import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCents } from './utils/money.js';
// must be in the first line and be used with live server
// we can use {cart as myCart} to rename the variable

let productHTML = '';
products.forEach((product) => {
    productHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">${product.name}</div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>
        <!--show the float in 2 decimal-->
        <div class="product-price">${formatCents(product.priceCents)}</div>

        <div class="product-quantity-container">
            <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" 
            data-id="${product.id}"> <!--create a new html attribute to distinguish which button was clicked-->
            Add to Cart
        </button>
    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;

function updateQuantity() {
    // update the total quantity
    let total = 0;
    cart.forEach((item) => {
        total += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = total;
}

// use querySelectAll to select all the elements which have the same class
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // dataset gives us all the attribute owned by that object
        // print all the attributes in console to check the each attribute name in order to use it
        const id = button.dataset.id; 
        addToCart(id); // this function is in cart.js
        console.log(id);
        updateQuantity();
    });
});