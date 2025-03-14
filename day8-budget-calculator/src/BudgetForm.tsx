import React from 'react';
import { useState } from 'react';

type BudgetFormProps = {
  addBudget: (name: string, budget: number) => void;
};

export const BudgetForm = React.memo(({ addBudget }: BudgetFormProps) => {
  const [formData, setFormData] = useState({ name: '', budget: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBudget(formData.name, Number(formData.budget));
    setFormData({ name: '', budget: '' });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg w-full min-w-80">
      <form className="flex flex-wrap items-end gap-7" onSubmit={handleSubmit}>
        <div className="flex-1 min-w-[150px] space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-gray-500 transition-all"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            budget
          </label>
          <input
            type="number"
            id="budget"
            min="0"
            value={formData.budget}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                budget: e.target.value,
              }))
            }
            required
            className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-gray-500 transition-all"
          />
        </div>
        <button
          type="submit"
          className="h-11 px-6 bg-gray-400 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
});
