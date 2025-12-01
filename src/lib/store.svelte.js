import { LocalStorage } from "./storage.svelte";

export const cart = new LocalStorage("cart", []);
export const user = new LocalStorage("user", {
    image_url: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg",
    username: null,
    email: null,
    phone: null
});


export function addProductToCart(product) {
    let index = cart.current.findIndex((item) => item.product.id == product.id);
    if (index > -1) {
        return;
    }
    let cart_item = {
        product: product,
        count: 1
    };
    cart.current.push(cart_item);
}

export function calcCartPrice() {
    let sum = 0;
    if (cart.current.length > 0)
        for (let i = 0; i < cart.current.length; i++) {
            sum += cart.current[i].product.price * cart.current[i].count;
            // console.log(cart.current[i]);
        }
    return sum;
}

export function removeItemFromCart(product) {
    let index = cart.current.findIndex(item => item.product.id == product.id);
        if (index > -1)
            cart.current.splice(index, 1);
}

export function cartContains(product) {
    let index = cart.current.findIndex((item) => item.product.id == product.id);
    if (index > -1) {
        return true;
    }
    return false;
}