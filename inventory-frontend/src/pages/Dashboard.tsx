import { useState, useEffect } from "react";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../services/api";
import InventoryItem from "../components/InventoryItem";
import InventoryForm from "../components/InventoryForm";

// Define InventoryItemType for better type safety
interface InventoryItemType {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
}

const Dashboard = () => {
  const [inventory, setInventory] = useState<InventoryItemType[]>([]);
  const [editingItem, setEditingItem] = useState<InventoryItemType | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data } = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error("Failed to fetch inventory");
    }
  };

  const handleAdd = async (item: Omit<InventoryItemType, "_id">) => {
    try {
      await addInventory(item);
      fetchInventory();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add item");
    }
  };
  const handleUpdate = async (updatedItem: Partial<InventoryItemType>) => {
    if (!editingItem || !editingItem._id) return;

    try {
      // Ensure all required fields are present before updating
      const itemToUpdate = {
        name: updatedItem.name ?? editingItem.name,
        quantity: updatedItem.quantity ?? editingItem.quantity,
        category: updatedItem.category ?? editingItem.category,
        price: updatedItem.price ?? editingItem.price,
      };

      await updateInventory(editingItem._id, itemToUpdate);
      fetchInventory();
      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInventory(id);
      fetchInventory();
    } catch (error) {
      console.error("Failed to delete item");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Inventory Dashboard
        </h1>

        {/* Add Inventory Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            ➕ Add Inventory
          </button>
        </div>

        {/* Inventory Form */}
        {showForm && (
          <div className="bg-gray-50 p-4 rounded-lg shadow mb-4">
            <InventoryForm
              onSubmit={(item) =>
                editingItem
                  ? handleUpdate({ ...item, _id: editingItem._id })
                  : handleAdd(item)
              }
              initialData={editingItem || undefined}
            />
          </div>
        )}

        {/* Inventory List */}
        {inventory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inventory.map((item) => (
              <InventoryItem
                key={item._id}
                item={item}
                onEdit={() => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No inventory items found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
