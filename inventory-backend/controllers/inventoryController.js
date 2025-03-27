import Inventory from "../models/Inventory.js";

export const getInventory = async (req, res) => {
  try {
    const userId = req.user;
    console.log(userId);
    const agents = await Inventory.find({ userId }); // Filter by adminId
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const addInventory = async (req, res) => {
  const { name, quantity, category, price } = req.body;
  const userId = req.user; // Fix: Extract `id` properly

  console.log("Extracted User ID:", userId); // Debugging

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No userId found" });
  }

  try {
    const newItem = new Inventory({
      name,
      quantity,
      category,
      price,
      userId,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, category, price } = req.body;
    const userId = req.user; // Ensure `auth` middleware sets this

    console.log("Extracted User ID:", userId); // Debugging

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No userId found" });
    }

    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Ensure the user owns the item
    if (item.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: Not authorized to update this item" });
    }

    // Update item fields
    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.category = category || item.category;
    item.price = price || item.price;

    await item.save();
    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the item
    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Delete the item
    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
