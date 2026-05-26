const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CohereClient } = require("cohere-ai");

require("dotenv").config();

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;

    // Validation
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file not uploaded",
      });
    }

    if (!job_desc) {
      return res.status(400).json({
        message: "Job description required",
      });
    }

    // Read PDF
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);

    const pdfData = await pdfParse(dataBuffer);

    console.log("PDF Extracted Successfully");

    // AI Prompt
    const prompt = `
You are an ATS Resume Analyzer.

Compare the following resume with the job description.

Return only in this exact format:

Score: XX
Reason: Your explanation

Resume:
${pdfData.text}

Job Description:
${job_desc}
`;

    // Cohere API call
// Cohere API call
const response = await cohere.chat({
  model: "command-a-03-2025",
  message: prompt,
  temperature: 0.7
});

console.log("RAW RESPONSE:", JSON.stringify(response, null, 2));

let result = "";

if (response?.text) {
    result = response.text;
}
else if (
    response?.message?.content &&
    response.message.content.length > 0
) {
    result = response.message.content[0].text;
}
else {
    throw new Error("No response from AI");
}

console.log("AI RESULT:", result);

    // Extract score
    const match = result.match(/Score:\s*(\d+)/i);

    const score = match
      ? parseInt(match[1])
      : 0;

    // Extract feedback
    const reasonMatch =
      result.match(/Reason:\s*([\s\S]*)/i);

    const reason =
      reasonMatch
      ? reasonMatch[1].trim()
      : "No feedback available";

    // Save DB
    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback: reason,
    });

    await newResume.save();

    // Delete uploaded file
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    res.status(200).json({
      message: "Analysis completed successfully",
      data: newResume,
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
};

exports.getAllResumeForUser = async (req, res) => {
  try {

    const { user } = req.params;

    const resume = await ResumeModel.find({
      user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Your Previous History",
      resume,
    });

  } catch (err) {

    console.error("FULL ERROR:", err);

    res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
};

exports.getAllResumeForAdmin = async (req, res) => {
  try {

    const resume = await ResumeModel.find({})
      .sort({ createdAt: -1 })
      .populate("user");

    res.status(200).json({
      message: "Fetched All User History",
      resume,
    });

  } catch (err) {

    console.error("FULL ERROR:", err);

    res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
};