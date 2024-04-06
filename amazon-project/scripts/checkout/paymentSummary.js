import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCents } from '../utils/money.js';

export function displayPaymentSummary() {
    // the total price when checking out
    let price = 0;
    let shipping = 0;

    cart.forEach((item) => {
        const match = getProduct(item.id);
        price += match.priceCents * item.quantity;
        const option = getDeliveryOption(item.deliveryId);
        shipping += option.priceCents
    });
    const taxCents = (price + shipping) * 0.1;
    const totalCents = taxCents + price + shipping;

    const html = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCents(price)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCents(shipping)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCents(price + shipping)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCents(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCents(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`;
    document.querySelector('.js-payment-summary').innerHTML = html;
}