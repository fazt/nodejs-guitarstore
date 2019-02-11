class Cart {
    constructor(cartSavedBefore = {}) {
        this.items = cartSavedBefore.items || {};
        this.totalQuantity = cartSavedBefore.totalQuantity || 0;
        this.totalPrice = cartSavedBefore.totalPrice || 0;
    }

    addItem(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item, quantity: 0, price: 0 };
        }
        storedItem.quantity++;
        storedItem.price = storedItem.item.price * storedItem.quantity;
        this.totalQuantity++;
        this.totalPrice += storedItem.item.price;
    }

    array() {
        const array = [];
        for (let id in this.items) {
            array.push(this.items[id]);
        }
        return array;
    }

}

module.exports = Cart;