import React from 'react';

type Category = {
  id: string;
  name: string;
};

type CategorySelectorProps = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            selectedCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;