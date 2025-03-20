## day9-pokemon-app

> 포켓몬 도감

- 포켓몬 리스트: 스크롤을 내리면 자동으로 포켓몬 목록이 추가로 로드됨 (무한 스크롤)
- 포켓몬 검색: 포켓몬 이름을 입력하면 해당 포켓몬을 검색 가능
- 상세 페이지 : 세부 포켓몬 정보 확인 가능
  - 좌우 화살표로 이전/다음 포켓몬 상세 정보로 이동 가능
  - "홈으로 돌아가기" 버튼 제공

![화면 기록 2025-03-21 오전 2 24 47](https://github.com/user-attachments/assets/db9c59b6-db17-4ef2-8dc9-b6c71ad1fc5a)

<br>

### 리액트 라우터 사용

- React Router를 사용해 홈페이지와 포켓몬 상세 페이지를 관리
- / → 포켓몬 리스트 페이지 (HomePage)
- /pokemon/:id → 포켓몬 상세 페이지 (DetailPage)

```typescript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}
```

<br>

### 무한 스크롤 구현 (Intersection Observer)

- 리스트 하단에 div를 배치
- IntersectionObserver를 활용해 div가 화면에 노출될 때 새로운 포켓몬 데이터를 요청
- 새로운 데이터가 로드되면 기존 리스트에 추가됨

```typescript
//현재 페이지 번호 상태
const [page, setPage] = useState(1);

//무한 스크롤을 감지할 하단 div를 useRef로 설정
const bottomRef = useRef<HTMLDivElement | null>(null);
const observer = useRef<IntersectionObserver | null>(null);

useEffect(() => {
  if (isSearching) return;

  fetchPokemonList(1, true);

  observer.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1); //하단 div가 관찰되면 페이지 증가
      }
    },
    { threshold: 1.0 },
  );

  if (bottomRef.current) observer.current.observe(bottomRef.current);

  return () => observer.current?.disconnect(); //언마운트시 옵저버 해제
}, [isSearching]);

useEffect(() => {
  if (!isSearching) fetchPokemonList(page); //페이지가 변경되면 새로운 데이터 로드
}, [page, isSearching]);
```
