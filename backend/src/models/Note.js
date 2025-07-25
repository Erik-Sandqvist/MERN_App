import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
        default: Date.now,
    },
},
{
    timestamps: true,}
);

const Note = mongoose.model("Note", noteSchema);

export default Note;