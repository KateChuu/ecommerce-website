// export variables and functions so we can use them in other files
export const cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(id) {
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
}