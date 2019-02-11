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

    reduceByOne(id) {
        this.items[id].quantity--;
        this.items[id].price -= this.items[id].item.price;
        this.totalPrice -= this.items[id].item.price; 
        this.totalQuantity--;
        if (this.items[id].quantity <= 0) {
            delete this.items[id];
        }
    }

    removeItem(id) {
        this.totalQuantity -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }

    array() {
        const array = [];
        for (let id in this.items) {
            array.push(this.items[id]);
        }
        console.log({array})
        return array;
    }

}

module.exports = Cart;