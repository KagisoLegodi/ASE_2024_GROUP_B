import { ObjectId } from "mongodb";

/**
 * Save a new shopping list for a user.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The response object containing a success message or error details.
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
        {
          message: "Invalid input data. Each item must have a 'name'.",
        },
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
      {
        message: "Failed to save shopping list. Please try again later.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Retrieve a shopping list for a user.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The response object containing the shopping list or error details.
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
      {
        message: "Failed to fetch shopping list. Please try again later.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Update or add items to a shopping list, including marking items as purchased.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The response object indicating the operation's success or failure.
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
      // Mark items as purchased
      const updates = items.map((item) => ({
        name: item.name.trim().toLowerCase(),
        purchased: item.purchased,
      }));

      const bulkOps = updates.map((update) => ({
        updateOne: {
          filter: { userId, "items.name": update.name },
          update: { $set: { "items.$.purchased": update.purchased } },
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
      // Append new items
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

      const result = await shoppingLists.updateOne(
        { userId },
        {
          $set: {
            items: updatedItems,
            updatedAt: new Date(),
          },
        }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { message: "Failed to add new items to shopping list." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "New items added to shopping list successfully." },
        { status: 200 }
      );
    } else {
      // Replace items in the shopping list
      const updatedItems = items.map((item) => ({
        name: item.name.trim().toLowerCase(),
        quantity: item.quantity || 1,
        purchased: item.purchased || false,
      }));

  // Validate UUID format (adjust regex if needed for specific UUID version)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return new Response(
      JSON.stringify({ error: "Invalid recipe ID format" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

/**
 * Remove specific items from a shopping list.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The response object indicating the operation's success or failure.
 */
export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db("devdb");

    const updatedRecipe = await db.collection("recipes").updateOne(
      { _id: id }, // Use `id` as a string
      {
        $set: { description: body.description },
        ...(await db.collection("recipes").findOne({ _id: id }))?.updatedBy
          ? { $set: { updatedBy: body.userId } }
          : { $setOnInsert: { updatedBy: body.userId } },
      }
    );

    if (!updatedRecipe.matchedCount) {
      return new Response(
        JSON.stringify({ error: "Recipe not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Recipe updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating recipe:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
