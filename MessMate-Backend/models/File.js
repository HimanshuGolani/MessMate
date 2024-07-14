import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String
    }
});

export default mongoose.model("File", fileSchema);
