// Example 1
// Encapsulate Simple record
const organization = {name : "Acme Gusberry", country : "GB"};

// this const is used in several codes like below
result += '<h1>%{organization.name}</h1>'; // example of reading
organization.name = newName; // example of writing

// Fisrt of All, Let's capsulate it
function getRawDataOfOrganization() {
    return organization;
}

// Then example of reading and writing will be changed like below
result += '<h1>${getRawDataOfOrganization().name}</h1>';
getRawDataOfOrganization().name = newName();

// The reason why we capsulate record(const) is not only to control variables itself also to control data inside variables
// To do so, replace record with class
// And make contructor to return new instance of class
class Organization {
    constructor(data) {
        this._data = data;
    }

    set name(aString) {this._data.name = aString;}

}

const organization = new Organization({name: "Acme Gusberry", country : "GB"});
function getRawDataOfOrganization() {return organization._data;}
function getOrganization() {return organization;}

// Now let the reading record code use getter (line #25 will be changed with #44)
getOrganization().name = newName;
// so client will use like below
result += '<h1>${getOrganization().name]</h1>';

// now remove line #40 
// and flat data into variables to make it pretty
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }

    get name() {return this._name;}
    set name(aString) {this._name = aString;}
    get country() {return this._country;}
    set country(aCountryCode) {this._country = aCountryCode;}
}