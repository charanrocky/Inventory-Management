import { useState, useEffect } from "react";

interface InventoryFormProps {
  onSubmit: (item: {
    name: string;
    quantity: number;
    category: string;
    price: number;
  }) => void;
  initialData?: {
    name: string;
    quantity: number;
    category: string;
    price: number;
  };
}

const InventoryForm = ({ onSubmit, initialData }: InventoryFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [quantity, setQuantity] = useState(initialData?.quantity || 1);
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price || 1);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setQuantity(initialData.quantity);
      setCategory(initialData.category);
      setPrice(initialData.price);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, quantity, category, price });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {initialData ? "Edit Inventory Item" : "Add New Inventory"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name */}
        <div>
          <label className="block text-gray-700 font-medium">Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            min="1"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {initialData ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
