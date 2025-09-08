import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb.js";

/**
 * Save a new shopping list for a user.
 */
export async function POST(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("devdb");
    const shoppingLists = db.collection("shopping_lists");

    const { userId, items } = await req.json();

    if (
      !userId ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.some((item) => !item.name)
    ) {
      return NextResponse.json(
        { message: "Invalid input data. Each item must have a 'name'." },
        { status: 400 }
      );
    }

    const existingList = await shoppingLists.findOne({ userId });
    if (existingList) {
      return NextResponse.json(
        { message: "Shopping list for this user already exists." },
        { status: 409 }
      );
    }

    const newShoppingList = {
      userId,
      items: items.map((item) => ({
        name: item.name.trim().toLowerCase(),
        quantity: item.quantity || 1,
        purchased: item.purchased || false,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await shoppingLists.insertOne(newShoppingList);

    return NextResponse.json(
      { message: "Shopping list saved successfully", listId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving shopping list:", error);
    return NextResponse.json(
      { message: "Failed to save shopping list", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Retrieve a shopping list for a user.
 */
export async function GET(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("devdb");
    const shoppingLists = db.collection("shopping_lists");

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required to fetch the shopping list." },
        { status: 400 }
      );
    }

    const shoppingList = await shoppingLists.findOne({ userId });

    if (!shoppingList) {
      return NextResponse.json(
        { message: "No shopping list found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Shopping list retrieved successfully", data: shoppingList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    return NextResponse.json(
      { message: "Failed to fetch shopping list", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Update or add items to a shopping list.
 */
export async function PUT(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("devdb");
    const shoppingLists = db.collection("shopping_lists");

    const { userId, items, append, markPurchased } = await req.json();

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid input data. 'userId' and 'items' are required." },
        { status: 400 }
      );
    }

    const existingList = await shoppingLists.findOne({ userId });
    if (!existingList) {
      return NextResponse.json(
        { message: "Shopping list not found for this user." },
        { status: 404 }
      );
    }

    if (markPurchased) {
      const bulkOps = items.map((item) => ({
        updateOne: {
          filter: { userId, "items.name": item.name.trim().toLowerCase() },
          update: { $set: { "items.$.purchased": item.purchased } },
        },
      }));

      const result = await shoppingLists.bulkWrite(bulkOps);

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { message: "No items were updated. Please check the item names." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Items marked as purchased successfully." },
        { status: 200 }
      );
    } else if (append) {
      const newItems = items.map((item) => ({
        name: item.name.trim().toLowerCase(),
        quantity: item.quantity || 1,
        purchased: item.purchased || false,
      }));

      const updatedItems = [
        ...existingList.items,
        ...newItems.filter(
          (newItem) =>
            !existingList.items.some(
              (existingItem) => existingItem.name === newItem.name
            )
        ),
      ];

      await shoppingLists.updateOne(
        { userId },
        { $set: { items: updatedItems, updatedAt: new Date() } }
      );

      return NextResponse.json(
        { message: "New items added to shopping list successfully." },
        { status: 200 }
      );
    } else {
      const updatedItems = items.map((item) => ({
        name: item.name.trim().toLowerCase(),
        quantity: item.quantity || 1,
        purchased: item.purchased || false,
      }));

      await shoppingLists.updateOne(
        { userId },
        { $set: { items: updatedItems, updatedAt: new Date() } }
      );

      return NextResponse.json(
        { message: "Shopping list updated successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating shopping list:", error);
    return NextResponse.json(
      { message: "Failed to update shopping list", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Remove specific items from a shopping list.
 */
export async function DELETE(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("devdb");
    const shoppingLists = db.collection("shopping_lists");

    const { userId, items } = await req.json();

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid input data. 'userId' and 'items' are required." },
        { status: 400 }
      );
    }

    const result = await shoppingLists.updateOne(
      { userId },
      {
        $pull: {
          items: { name: { $in: items.map((i) => i.name.trim().toLowerCase()) } },
        },
        $set: { updatedAt: new Date() },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No items were removed. Please check the item names." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Items removed from shopping list successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting shopping list items:", error);
    return NextResponse.json(
      { message: "Failed to delete items", error: error.message },
      { status: 500 }
    );
  }
}