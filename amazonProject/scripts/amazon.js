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
        <div class="product-price">${(product.priceCents / 100).toFixed(2)}</div>

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
            data-product-id="${product.id}"> <!--create a new html attribute to distinguish which button was clicked-->
            Add to Cart
        </button>
    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;
// use querySelectAll to select the elements which are not displayed yet?
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // dataset gives us all the attribute owned by that object
        // print all the attributes in console to check the each attribute name in order to use it
        const id = button.dataset.productId; 

        // loop through cart to check the product is in the cart or not
        let match;
        cart.forEach((item) => {
            if(item.productId === id) {
                match = item;
            }
        });
        // the item is already in the cart, so we increase the quantity
        if(match) {
            match.quantity += 1;
        }else { // the item is not in the cart yet
            cart.push({
                productId: id,
                quantity: 1
            });
        }        
        console.log(cart);

        // update the total quantity
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML = total;
    });
});