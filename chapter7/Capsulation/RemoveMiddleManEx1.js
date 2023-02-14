manager = aPerson.manager;

class Persion {
    // 위임 객체를 얻는 getter
    get department() {
        return this._department;
    }


}

// client-side
manager = aPerson.department.manager;