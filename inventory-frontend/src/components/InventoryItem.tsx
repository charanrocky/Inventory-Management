interface InventoryItemProps {
  item: {
    _id: string;
    name: string;
    quantity: number;
    category: string;
    price: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const InventoryItem = ({ item, onEdit, onDelete }: InventoryItemProps) => {
  return (
    <div className="bg-white p-4 border rounded-lg shadow-lg flex justify-between items-center hover:shadow-xl transition duration-200">
      {/* Item Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">
          Category: <span className="font-medium">{item.category}</span>
        </p>
        <p className="text-gray-600 text-sm">
          Quantity: <span className="font-medium">{item.quantity}</span>
        </p>
        <p className="text-gray-600 text-sm">
          Price:{" "}
          <span className="font-medium text-green-600">${item.price}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
