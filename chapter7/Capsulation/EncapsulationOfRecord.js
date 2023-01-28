// 캡슐화하기
// 캡슐화란? 각 모듈이 자신을 제외한 다른 모듈에게 드러내지 않아야할 비밀을 어떻게 잘 숨기느냐 
// 1. 레코드를 담은 변수를 캡슐화한다.
// 2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
// 3. 테스트한다.
// 4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
// 5. 레코드를 반환하는 예전 함수를 사용하는 코드를 4에서 만든 새 함수를 사용하도록 바꾼다. 필드에 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때 마다 테스트한다.
// 6. 클래스에서 원본 데이터를 반환하는 접근자와 원본레코드를 반환하는 함수드를 제거한다.
// 7. 테스트한다.
// 8. 레코드의 필드도 데이터 구조인 중첩구조라면 레코드 캡슐활하기와 컬렉션 캡슐화하기를 재귀적으로 적용한다

// example 1
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