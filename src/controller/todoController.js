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


export const getAllTodo = async (req, res) => {
    try {

        const data = await todoSchema.find({ userId: req.userId });

        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Todo not fetched",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data,
        });
    } catch (error) {
        console.error("Error in addNote:", error);
        return res.status(400).json({
            success: false,
            message: "Todo not fetched",
        });
    }
};


export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const data = await todoSchema.findByIdAndDelete({ userId: req.userId, _id: todoId })

        if (data) {
            return res.status(200).json({
                success: true,
                message: "Todo deleted successfully",
                data
            });
        }
        else {
            return res.status(404).json({
                success: true,
                message: "Todo not found",
                data,
            });
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Todo not deleted"
        });
    }

}

