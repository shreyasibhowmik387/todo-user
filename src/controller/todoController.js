import todoSchema from "../models/todoSchema.js";

export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;

    const existing = await todoSchema.findOne({
      title: title,
      userId: req.userId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }

    const data = await todoSchema.create({
      title,
      userId: req.userId,
    });

    if (!data) {
      return res.status(500).json({
        success: false,
        message: "Todo not created",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data,
    });
  } catch (error) {
    console.error("Error in addNote:", error);
    return res.status(500).json({
      success: false,
      message: "Could not access",
    });
  }
};