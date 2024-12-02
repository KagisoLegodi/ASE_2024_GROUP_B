export async function PUT(req, { params }) {
    const { id } = params; // Extract ID from URL
    const body = await req.json(); // Parse incoming request body

    console.log("Incoming request:", { id, body });

    // Validate required fields
    if (!id||!body.description || !body.userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      // Perform the database update
      const updatedRecipe = await db.collection("recipes").updateOne(
        { _id: id }, // Match recipe by ID
        { $set: { description: body.description, updatedBy: body.userId } } // Update fields
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