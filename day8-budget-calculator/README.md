## day8-budget-calculator

> 예산 계산기 앱

- 이름과 가격을 입력하고 제출하면 항목이 생김
- 각 항목은 삭제하거나 수정가능
- 하단에 총 가격 표기
- delete all 버튼 클릭시 모든 항목 삭제
- 로컬 스토리지에 내역 저장 & 불러오기 기능

![화면 기록 2025-03-14 오후 7 15 29](https://github.com/user-attachments/assets/a4d74fea-07f8-419b-98d3-47e1e95460e9)

<br>

### 핸들러 함수를 커스텀 훅으로 분리

- 핸들러를 useBudget 커스텀 훅으로 분리
- 최상위 App.tsx에서 사용

```typescript
//useBudget.ts
export const useBudget = () => {
  const initialData = () => getLocalStorage(STORAGE_KEY) || [];
  const [budgets, setBudgets] = useState<Budget[]>(initialData);

  //최초 실행시 로컬 스토리지 내 정보 가져옴
  useEffect(() => {
    setLocalStorage(STORAGE_KEY, budgets);
  }, [budgets]);

  //예산 내역 추가 핸들러
  const addBudget = useCallback((name: string, budget: number) => {
    const newBudget: Budget = {
      id: Date.now(),
      name,
      budget,
    };

    setBudgets((prev) => [...prev, newBudget]);
  }, []);
};

//App.tsx
function App() {
  const {
    budgets,
    addBudget,
    deleteBudget,
    editBudget,
    getAllBudgets,
    deleteAllBugets,
  } = useBudget();
}
```

### useCallback과 React.memo를 사용한 최적화

- 추가, 삭제, 수정 버튼 클릭시 전체 컴포넌트가 리랜더링 됨
- BudgetForm 컴포넌트와 BudgetItem 컴포넌트에 React.memo() 사용
  - BudgetList 컴포넌트는 단순히 BudgetItem을 나열하는 역할을 하기에 사용하지 않음 (리렌더링 비용 낮음)
- 부모 컴포넌트(`App.tsx`)가 리렌더링될 때마다 핸들러 함수가 새로 생성되고, prop이 변경되었다고 인식되어 리랜더링이 발생
  - 핸들러에 useCallback 적용

```typescript
//핸들러에 useCallback 적용
const deleteBudget = useCallback((id: number) => {
  setBudgets((prev) => prev.filter((budget) => budget.id !== id));
}, []);
```
