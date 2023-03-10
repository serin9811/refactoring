// 기본형을 객체로 바꾸기
// 1. 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
// 2. 단순한 값 클래스를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
// 3. 정적 검사를 수행한다.
// 4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다.
// 5. 새로 만든 클래스의 게터를 호출한 결과를 방환하도록 게터를 수정한다.
// 6. 테스트한다.
// 7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.
