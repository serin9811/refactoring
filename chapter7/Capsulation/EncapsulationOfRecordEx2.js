// Example 2
// Encapsulate nested record

// It is HashMap of customer's information
"1920": {
    name: "Martin Fowler",
    id: "1920",
    usages: {
        "2016": {
            "1": 50,
            "2": 55,
            "3": 55,
            "4": 56,
            "5": 51,
            "6": 50,
            "7": 52,
            "8": 53,
            "9": 51,
            "10": 59,
            "11": 49,
            "12": 66
        }
        "2015": {
            "1": 50,
            "2": 55,
            "3": 55,
            "4": 56,
            "5": 51,
            "6": 50,
            "7": 52,
            "8": 53,
            "9": 51,
            "10": 59,
            "11": 49,
            "12": 66
        }
    }
}

"38673": {
    name: "Nil Ford",
    id: "38673",
    usages: {
        "2016": {
            "1": 50,
            "2": 55,
            "3": 55,
            "4": 56,
            "5": 51,
            "6": 50,
            "7": 52,
            "8": 53,
            "9": 51,
            "10": 59,
            "11": 49,
            "12": 66
        }
        "2015": {
            "1": 50,
            "2": 55,
            "3": 55,
            "4": 56,
            "5": 51,
            "6": 50,
            "7": 52,
            "8": 53,
            "9": 51,
            "10": 59,
            "11": 49,
            "12": 66
        }
    }
}

// As much as reudundancy of nested record is, you have to inspect deeper inside the data structure
// exmaple of writng
customerData[customerID].usages[year][month] = amount;

// example of reading
function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usages[laterYear][month];
    const earlier = customerData[customerID].usages[laterYear -1][month];
    return {laterAmount: later, change: later - earlier};
}

// As we did for `EncapsulatrionRecordEx1`, let's start with encapsultaion of varibles
function getRawDataOfCustomers() {return customerData;}
function setRawDataOfCustomers(arg) {customerData = arg;}

// example of writing
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

// example of reading
function compareUsage(customerID, laterYear, month) {
    const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
    const earlier = getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];

    return {laterAmount: later, change:later - earlier};
}

// And then define Class and rewrite functions
class CustomerData {
    constructor(data) {
        this._data = data;
    }

    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }

    get rawData() {
        return _.cloneDeep(this.data); //https://lodash.com/docs#cloneDeep
    }

    usage(customerID, year, month) {
        return this._data[customerID].usages[year][month];
    }
}

function getCustomerData() {return customerData;}
function getRawDataOfCustomers() {return customerData._data;}
function setRawDataOfCustomers(arg) {customerData = new CustomerData(arg);}

// In this case, the most important part is getter
// example of using data
setUsage(customerID, year, month, amount);

function setUsage(customerID, year, month, amount) {
    getRawDataOfCustomers()[customerID].usages[year][month] = amount;
}

// now move this function inside the class liek line #107
// and line #118 will be replace with the code below
getCustomerData().setUsage(customerID, year, month, amount);

// You might wonder if there is anything that you missed
// There are several ways to test it. 
// First of them is deep copy from getRawDataOfCustomers() function
function getCustomerData() {return customerData;}
function getRawDataOfCustomers() {return customerData.rawData;}
function setRawDataOfCustomers(arg) {customerData = new CustomerData(arg);}

// And function to getRawData in line #111 is added
// Or there is a way to use read-only proxy
// If you use it, whent the internal object is edited by client, the proxy throws exception

// Now how can we deal with read?
// We can do it like we did with the setter which means extract function from codes and move it into class

// Inside CustomerData class, usage() is added. See line #115

// Instead of line #80, now you can access data with usage function like below
function compareUsage(customerID, laterYear, month) {
    const later = getCustomerData().usage(customerID, laterYear, month);
    const ealier = getCustomerData().usage(customerID, laterYear - 1);
    return {laterAmount: later, change: later - ealier};
}

// You can pass the original data when a client requests but there is no way to block them from editing the original data
// To avoid it, you can provide it with rawData() which returns copied data
function compareUsage(customerID, laterYear, month) {
    const later = getCustomerData().rawData[customerID].usages[laterYear][month];
    const earlier = getCustomerData().rawData[customerID].usages[laterYear - 1][month];

    return {laterAmount: later, change: later - earlier};
}
// But in this case, there is things to consider that when the data structure is huge, the cost of copying increases and make performing time slow.
// If you have concerns, measure the performance rather than just worrying