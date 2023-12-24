import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCents} from './utils/money.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 
// use module to load external ESM library
// default export: if we only import one thing, we don't have to type {}. Each file can only have one default export 

let html = '';
console.log(cart);
cart.forEach((item) => {
    const id = item.id;
    // the product we put in the cart
    let match = '';
    products.forEach((product) => {
        if(product.id === id) {
            match = product;
        }
    });

    const deliveryId = item.deliveryId;
    let option;
    deliveryOptions.forEach((i) => {
        if(i.id === deliveryId) {
            option = i;
        }
    });
    const today = dayjs();
    // add value of option.deliveryDays to today
    const deliveryDate = today.add(option.deliveryDays, 'days');
    // weekDay, day, month (see the official format doc)
    const dateStr = deliveryDate.format('dddd, D, MM');
    
    html += 
    `<div class="cart-item-container js-cart-item-container-${match.id}">
        <div class="delivery-date">${dateStr}</div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${match.image}">

            <div class="cart-item-details">
            <div class="product-name">${match.name}</div>
            <div class="product-price">$${formatCents(match.priceCents)}</div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <!-- add an id for the products in the cart to identify then -->
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-id="${match.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${displayDeliveryOptions(match, item)}
            </div>
        </div>
        </div>`;
})
document.querySelector('.js-order-summary').innerHTML = html;

// add eventListner to delete product
document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        // remove the product from cart and use id the identify them
        const id = link.dataset.id;
        removeFromCart(id);

        // remove the item from the page
        const container = document.querySelector(`.js-cart-item-container-${id}`);
        container.remove();
    });
});

function displayDeliveryOptions(match, item) {
    let html = '';
    deliveryOptions.forEach((option) => {
        const today = dayjs();
        // add value of option.deliveryDays to today
        const deliveryDate = today.add(option.deliveryDays, 'days');
        // weekDay, day, month (see the official format doc)
        const dateStr = deliveryDate.format('dddd, D, MM');
        const priceStr = option.priceCents === 0? 'FREE': formatCents(option.priceCents);
        // isChecked is a condition not a value
        const isChecked = option.id === item.deliveryId;

        html += `
        <div class="delivery-option">
            <input type="radio" 
            ${isChecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${match.id}">
            <!-- the 3 redio buttons need to have different name so we can choose only one for each product in the cart -->
            <div>
            <div class="delivery-option-date">${dateStr}</div>
            <div class="delivery-option-price">${priceStr}</div>
            </div>
        </div>`;
    });
    return html;
}