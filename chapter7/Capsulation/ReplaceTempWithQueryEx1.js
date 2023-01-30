// Example
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }

    get price() {
        var basePrice = this._quantity * this._item.price;
        var discountFactor = 0.98;

        if(basePrice > 1000) discountFactor -= 0.03;
        
        return basePrice * discountFactor;
    }
}

// Now let's make variables such as basePrice and discountFactor to methods
// First off, make basePrice as const with read-only
// And test it
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }

    get price() {
        const basePrice = this._quantity * this._item.price;
        var discountFactor = 0.98;
        if(basePrice > 1000) discountFactor -= 0.03;

        return basePrice * discountFactor;
    }
}

// And extract right-hand side to getter
class Order {
    get price() {
        const basePrice = this.basePrice;
        var discountFactor = 0.98;
        if(basePrice > 1000) discountFactor -= 0.03;

        return basePrice * discountFactor;
    }

    get basePrice() {
        return this._quantity * this._item.quantity;
    }
}

// Test it and inline it
class Order {
    get price() {
        //const basePrice = this.basePrice;
        var discountFactor = 0.98;
        if(this.basePrice > 1000) discountFactor -= 0.03;

        return this.basePrice * discountFactor;
    }

    get basePrice() {
        return this._quantity * this._item.quantity;
    }

    get discountFactor() {
        var discountFactor = 0.98;
        if(this.basePrice > 1000) discountFactor -= 0.03;

        return discountFactor;
    }
}
