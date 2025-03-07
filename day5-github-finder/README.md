## day5-github-finder

> 깃허브 프로필 찾기 앱

- 입력란에 유저명을 입력하면 깃허브 api 요청
- 유저 발견시 api 정보를 화면에 출력
- 유저가 없는 경우 user not found 출력

![화면 기록 2025-03-07 오후 3 49 55](https://github.com/user-attachments/assets/ca27af53-e391-40fe-9d38-0779709a8539)

<br>

### 디바운싱 적용하기

- 입력마다 매번 api를 요청했더니 정지를 받음
- 디바운싱을 적용해 입력하여 사용자 입력 후 1초가 지나면 api 호출

```javascript
const debounce = (func, delay) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debouncedHandleInput = debounce(handleInput, 1000);
input.addEventListener("input", debouncedHandleInput);
```
