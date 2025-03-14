import React from 'react';
import { useState } from 'react';
import { Budget } from './types/Budget';

type BudgetFormProps = {
  itemData: Budget;
  deleteBudget: (id: number) => void;
  editBudget: (id: number, newName: string, newBudget: number) => void;
};

export const BudgetItem = React.memo(
  ({ itemData, deleteBudget, editBudget }: BudgetFormProps) => {
    const { id, name, budget } = itemData;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: name || '',
      budget: budget || '',
    });

    const handleEdit = () => {
      setIsEditing((prev) => !prev);
      editBudget(id, formData.name, Number(formData.budget));
    };

    return (
      <div
        className="bg-gray-50 p-2 px-8 rounded-lg min-w-80 mt-5 flex justify-between items-center h-16"
        key={String(id)}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
              }}
              className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-gray-500 transition-all mr-2"
              required
            />
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, budget: e.target.value }));
              }}
              className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-1 outline-none focus:border-gray-500 transition-all mr-2"
              required
            />
            <button
              className="h-5 px-3 bg-gray-400 text-white text-xs rounded-lg shadow-md hover:bg-gray-500 transition-all"
              onClick={handleEdit}
            >
              confirm
            </button>
          </>
        ) : (
          <>
            <span>{name}</span>
            <div>
              <span>{`${budget}₩`}</span>
              <button
                className="h-5 px-3 bg-gray-400 text-white text-xs rounded-lg shadow-md hover:bg-gray-500 transition-all ml-8 mr-3"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                edit
              </button>
              <button
                className="h-5 px-3 bg-gray-400 text-white text-xs rounded-lg shadow-md hover:bg-gray-500 transition-all"
                onClick={() => deleteBudget(id)}
              >
                delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  },
);
