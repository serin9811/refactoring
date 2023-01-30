// Example 1
class Order {
    constructor(data) {
        this.priority = data.priority;
    }

    get priority() {return this._priority;}
    set priority(aString) {this._priority = aString;}
    toString() {return this._val}

}

// Client 
highPriorityCount = orders.filter(o => "high"===o.priority || "rush" === o.priority)
.length;

// First off, Encapsulate variables
// See line #7, 8

// Make a class to represent an attribute of priority
class Priority {
    constructor(value) {this._value = value;}
    toString() {return this._value;}
}

// Edit access modifier in Order class
get priorityString() {return this._priority.toString();}
set priority(aString) {this._priority = new Priority(aString);}

// Client
highPriorityCount = orders.filter(o => "high"===o.priorityString || "rush" === o.priorityString)
.length;

// Let's make it better
class Order {
    get priority() {return this._priority;}
    get priorityString() {return this._priority.toString();}
    set priority(aString) {this._priority = new Priority(aString);}
}

// client
highPriorityCount = orders.filter(o => "high"===o.priority.toString() || "rush" === o.priority.toString())
.length;

class Priority {
    constructor(value) {
        if(value instanceof Priority) 
            return value;
        if(Priority.legalValues().includes(value)) 
            this._value = value;
        else 
            throw new Error('<${value}> is invalid for Priority');
    }

    toString() {return this._value;}
    get _index() {return Priority.legalValues().findIndex(s => s === this._value);}
    static legalValues() {return ['low', 'noraml', 'high', 'rush'];}
    equals(other) {return this._index === other._index;}
    higherThan(other) {return this._index > other._index;}
    lowerThan(other) {return this._index < other._index;}
}

// client
highPriorityCount = orders.filter(o => o.priority.higherThan(new Priority("normal")))
.length;