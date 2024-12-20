import Question from "../models/question.js";

export const uploadQuestions = async (req, res) => {
  try {
    // Destructure and validate input
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Questions array is required and cannot be empty!",
      });
    }

    // Validate and check for duplicates
    for (const question of questions) {
      const {  question: questionText, options, answer, category, subTopic, subjectName, difficulty } = question;

      // Validate fields
      if ( !questionText || !options || !answer || !category || !subjectName) {
        return res.status(400).send({
          success: false,
          message: `Each question must have questionId, question, options, answer, category, and subjectName. Missing fields in one or more questions.`,
        });
      }

      if (!Array.isArray(options) || !Array.isArray(answer) || options.length === 0 || answer.length === 0) {
        return res.status(400).send({
          success: false,
          message: `Options and answers must be non-empty arrays.`,
        });
      }

      // Check for duplicate questionId or question text
      const existingQuestion = await Question.findOne({
        $or: [ { question: questionText }],
      });

      if (existingQuestion) {
        return res.status(400).send({
          success: false,
          message: ` text "${questionText}" already exists.`,
        });
      }
    }

    // Insert questions into the database
    const result = await Question.insertMany(questions);

    // Send success response
    res.status(200).send({
      success: true,
      message: "Questions uploaded successfully",
      data: result,
    });
  } catch (error) {
    // Handle errors
    console.error("Error uploading questions:", error);
    res.status(500).send({
      success: false,
      message: "Error uploading questions",
      error: error.message,
    });
  }
};

//fetching data function


export const getQuestions = async (req, res) => {
  try {
    // Destructure query parameters
    const {  category, subjectName } = req.query;
    const subjectNamesArray = Array.isArray(subjectName) ? subjectName : [subjectName];

console.log("Category:", category);
console.log("Subject Names:", subjectNamesArray);

    // Build a dynamic query object
    const query = {};
    
    if (category) query.category = category;
    if (subjectNamesArray.length > 0) query.subjectName = { $in: subjectNamesArray };

    // Fetch questions from the database
    const questions = await Question.find(query);

    // Check if any questions were found
    if (questions.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No questions found matching the provided criteria.",
      });
    }

    // Format the response
    const formattedQuestions = questions.map((q) => ({
      
      question: q.question,
      category: q.category,
      options: q.options.map((opt) => ({
        key: opt.key,
        value: opt.value,
        id: opt._id,
      })),
      answer: q.answer.map((ans) => ({
        key: ans.key,
        value: ans.value,
        id: ans._id,
      })),
      subTopic: q.subTopic || "Unknown",
    }));
    console.log(formattedQuestions);
    

    // Send the formatted response
    res.status(200).send({
      success: true,
      message: "Questions retrieved successfully.",
      data: formattedQuestions,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching questions:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching questions.",
      error: error.message,
    });
  }
};
