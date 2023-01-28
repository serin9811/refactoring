// Example of Ecapsulation of Collection
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }

    get name() {return this._name;}
    get courses() {return this.courses;}
    set courses(aList) {this._courses = aList;}
}

class Course {
    constructor(name, isAdvanced) {
        this._name = name;
        this._isAdvanced = isAdvanced;
    }

    get name() {return this._name;}
    get isAdvanced() {return this._isAdvanced;}

    addCourse(aCourse) {
        this._courses.push(aCourse);
    }

    removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError();}) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1);
    }

}

let aPerson = new Person();
numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length;

// You might think it has been perfectly capsulated
// But there is a defect that the client who used setter can edit this collection as they want
const basicCoursesName = readBasicCourseNames(filename);
aPerson.courses = basicCoursesName.map(name => new Course(name, false));

// On client side, it might convenient to edit list of courses like below
for(const name of readBasicCourseNames(filename)) {
    aPerson.courses.push(new Course(name, false));
}

// But if it is like this, Person Class is no longer able to control collection and it breaks capsulation
// It is because we only encapsulate the process to refer the fields, but we didn't encapsulate the contents inside fields
// To make it better, let's add method to make clients add course or remove course one by one
// See line #22 ~ line #30

// Now let's replace line #43 with below lines
for(const name of readBasicCourseNames(filename)) {
    aPerson.addCourse(new Course(name, false));
}

// setCourses() method is no longer needed since there is method which makes able to add and remove each course
// You can remove setCourses() but if you have specific reason to use setter, than you can make is set the copied data from argument like below
set courses(aList) {
    this._courses = aList.slice(); // slice() returns new array of provided data
}

get courses() {
    return this._courses.slice(); // slice() returns new array of provided data
}
// From author's various experience, he said it is always better to make method use replica instead of original data