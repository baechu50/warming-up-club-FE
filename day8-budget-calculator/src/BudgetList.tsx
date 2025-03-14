import { Budget } from './types/Budget';
import { BudgetItem } from './BudgetItem';

type BudgetListProps = {
  budgets: Budget[];
  deleteBudget: (id: number) => void;
  editBudget: (id: number, newName: string, newBudget: number) => void;
};

export const BudgetList = ({
  budgets,
  deleteBudget,
  editBudget,
}: BudgetListProps) => {
  return (
    <div className="w-full">
      {budgets.map((budget) => (
        <BudgetItem
          key={budget.id}
          itemData={budget}
          deleteBudget={deleteBudget}
          editBudget={editBudget}
        />
      ))}
    </div>
  );
};
