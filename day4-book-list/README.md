## day4-book-list

> 책 기록 앱

- 입력란에 책 이름, 책 저자를 입력하고 제출 버튼을 누르면 리스트에 추가됨
- 리스트에서 삭제버튼을 누르면 해당 기록이 삭제됨
- 로컬스토리지에 책 데이터를 저장하여 새로고침해도 데이터가 유지됨

![화면 기록 2025-03-07 오전 4 08 17](https://github.com/user-attachments/assets/09101652-4dff-4a00-ba05-c72d55bbfc66)

<br>

### 로컬 스토리지 사용하기

- 각 책 데이터는 객체로 저장, id는 생성 시간으로 부여
- 데이터 추가 & 삭제시 로컬 스토리지에도 반영
- 데이터를 화면에 출력할때, id(생성시간)을 기준으로 sort하여 불러올때 리스트 순서가 바뀌는 문제 해결

```javascript
const newBook = {
  id: Date.now(), //데이터 생성 시간
  name: inputName.value,
  author: inputAuthor.value,
};

const displayData = (data) => {
  const sortedData = Object.values(data).sort((d1, d2) => d1.id - d2.id); //생성 시간을 기반으로 sort
  sortedData.forEach((d) => {
    bookList.appendChild(createItem(d));
  });
};
```
