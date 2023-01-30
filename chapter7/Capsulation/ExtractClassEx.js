class Person {
    get name() {return this._name;}
    set name(arg) {this._name = arg;}
    get telephoneNumber() {return '${this.officeAreaCode}) ${this.officeNumber}';}
    get officeAreaCode() {return this._officeAreaCode;}
    set officeAreaCode(arg) {this._officeAreaCode = arg;}
    get officeNumber() {return this._officeNumber;}
    set officeNumber(arg) {this._officeNumber = arg;}
}

// Let's extract code related to telephone number to new class
class TelephoneNumber {}

// And edit constructor of Person class
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
}

class TelephoneNumber {
    get officeAreaCode() {return this._officeAreaCode;}
    set officeAreaCode(arg) {this._officeAreaCode = arg;}
}

// And move fields into TelephoneNumber class one by one
class Person {
    get officeAreaCode() {return this._telephoneNumber.officeAreaCode;}
    set officeAreaCode(arg) {this._telephoneNumber.officeAreaCode = arg;}
}

// Test it and pass to next fields
class TelephoneNumber {

    // ...
    get officeNumber() {return this._officeNumber;}
    set officeNumber(arg) {this._officeNumber = arg;}
}

class Person {

    // ...
    get officeNumber() {return this._telephoneNumber.officeNumber;}
    set officeNumber(arg) {this._telephoneNumber.officeNumber = arg;}
}

class TelephoneNumber {
    
    // ...
    get telephoneNumber() {return '(${this.officeAreaCode}) ${this.officeNumber}';}
}

class Person {
    // ...
    get telephoneNumber() {return this._telephoneNumber.telephoneNumber;}
}

// Now you can change name of variables to proper name
class TelephoneNumber {
    get areaCode() {return this._areaCode;}
    set areaCode(arg) {this._areaCode = arg;}
    get number() {return this._number;}
    set number(arg) {this._number = arg;}
    toString() {
        return '(${this.areaCode}) ${this.number}';
    }
}