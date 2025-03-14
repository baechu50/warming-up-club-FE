import { BudgetForm } from './BudgetForm';
import { BudgetList } from './BudgetList';
import { useBudget } from './hooks/useBudget';

function App() {
  const {
    budgets,
    addBudget,
    deleteBudget,
    editBudget,
    getAllBudgets,
    deleteAllBugets,
  } = useBudget();

  return (
    <>
      <div className="p-16 flex flex-col items-center">
        <h1 className="text-3xl mb-10">Budget Calculator</h1>
        <BudgetForm addBudget={addBudget} />
        <BudgetList
          budgets={budgets}
          deleteBudget={deleteBudget}
          editBudget={editBudget}
        />
        <div className="flex justify-between items-center w-full px-8 mt-5">
          <span>{`Total: ${getAllBudgets()}₩`}</span>
          <button
            onClick={() => deleteAllBugets()}
            className="h-6 px-3 bg-gray-400 text-white text-xs rounded-lg shadow-md hover:bg-gray-500 transition-all"
          >
            Delete All
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
