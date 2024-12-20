import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  answer: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  subTopic : {
    type : String, 
    
  },
  subjectName: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Hard", "Medium", "Easy"],
  },
},{timestamps : true});

const Question = mongoose.model("Question", questionSchema);
export default Question;
