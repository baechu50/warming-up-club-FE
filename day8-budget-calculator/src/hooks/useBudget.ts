import { useEffect, useState, useCallback } from 'react';
import { Budget } from '../types/Budget';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const STORAGE_KEY = 'budgets';

export const useBudget = () => {
  const initialData = () => getLocalStorage(STORAGE_KEY) || [];
  const [budgets, setBudgets] = useState<Budget[]>(initialData);

  useEffect(() => {
    setLocalStorage(STORAGE_KEY, budgets);
  }, [budgets]);

  const addBudget = useCallback((name: string, budget: number) => {
    const newBudget: Budget = {
      id: Date.now(),
      name,
      budget,
    };

    setBudgets((prev) => [...prev, newBudget]);
  }, []);

  const deleteBudget = useCallback((id: number) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  }, []);

  const editBudget = useCallback(
    (id: number, newName: string, newBudget: number) => {
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.id === id
            ? { ...budget, name: newName, budget: newBudget }
            : budget,
        ),
      );
    },
    [],
  );

  const deleteAllBugets = () => {
    setBudgets([]);
  };

  const getAllBudgets = () => {
    return budgets.reduce((acc, budget) => acc + budget.budget, 0);
  };

  return {
    budgets,
    addBudget,
    deleteBudget,
    editBudget,
    deleteAllBugets,
    getAllBudgets,
  };
};
