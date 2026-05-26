import React, { useState, useContext, useEffect } from "react";
import "./dashboard.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Skeleton from "@mui/material/Skeleton";
import axios from "../../utils/axios";
import { AuthContext } from "../../utils/AuthContext";
import userImage from "../../assets/user.png";

const DashBoard = () => {
  const [uploadFileText, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [resumeHistory, setResumeHistory] = useState([]);

  const { userInfo } = useContext(AuthContext);

  // Fetch history
  useEffect(() => {
    axios
      .get("/api/resume/guest")
      .then((res) => {
        setResumeHistory(res.data.resume);
      })
      .catch((err) => {
        console.log("History Error:", err);
      });
  }, []);

  const onhandleChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };

  const onhandleUpload = async () => {
    setResult(null);

    if (!jobDesc || !resumeFile) {
      alert("Please fill Job Description & upload Resume");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", "guest");

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/resume/addResume",
        formData
      );

      setResult(response.data.data);

      // Refresh history after new upload
      const historyRes = await axios.get("/api/resume/guest");

      setResumeHistory(historyRes.data.resume);

    } catch (err) {
      console.log("FULL FRONTEND ERROR:", err);

      if (err.response) {
        console.log("SERVER RESPONSE:", err.response.data);

        alert(
          JSON.stringify(
            err.response.data,
            null,
            2
          )
        );
      } else {
        alert(err.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Dashboard">

      <div className="DashboardLeft">

        <div className="DashboardHeader">
          <div className="DashboardHeaderTitle">
            Smart Resume Screening
          </div>

          <div className="DashboardHeaderLargeTitle">
            Resume Match Score
          </div>
        </div>

        <div className="alertInfo">

          <div>
            🔔 Important Instructions :-
          </div>

          <div className="dashboardInstruction">

            <div>
              📃 Please paste complete job description
            </div>

            <div>
              📜 Only PDF format (.pdf) accepted
            </div>

          </div>
        </div>

        <div className="DashboardUploadResume">

          <div className="DashboardResumeBlock">
            {uploadFileText}
          </div>

          <div className="DashboardInputField">

            <label
              htmlFor="inputField"
              className="analyzerAIBtn"
            >
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf"
              id="inputField"
              onChange={onhandleChangeFile}
            />

          </div>

        </div>

        <div className="jobDesc">

          <textarea
            value={jobDesc}
            onChange={(e) =>
              setJobDesc(e.target.value)
            }
            className="textArea"
            placeholder="Paste Job Description"
            rows={10}
            cols={50}
          />

          <div
            className="AnalyzerBtn"
            onClick={onhandleUpload}
          >
            Analyze
          </div>

        </div>

      </div>

      <div className="DashBoardRight">

        <div className="DashboardRightTopCard">

          <div>Analyzer With AI</div>

          <img
            className="profileImg"
            src={userInfo?.photoUrl || userImage}
            alt="User"
            onError={(e) => {
              e.target.src = userImage;
            }}
          />

          <h2>
            {userInfo?.name || "Guest User"}
          </h2>

        </div>

        {result && (
          <div className="DashboardRightTopCard">

            <div>Results</div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >

              <h1>
                {result?.score}%
              </h1>

              <CreditScoreIcon
                sx={{ fontSize: 22 }}
              />

            </div>

            <div className="feedback">

              <h3>Feedback</h3>

              <p>
                {result?.feedback}
              </p>

            </div>

          </div>
        )}

        <div className="DashboardRightTopCard">

          <h3>Previous History</h3>

          {resumeHistory.length > 0 ? (
            resumeHistory.map((item) => (
              <div
                key={item._id}
                style={{
                  marginBottom: "10px"
                }}
              >
                <p>
                  <strong>
                    {item.resume_name}
                  </strong>
                </p>

                <p>
                  Score: {item.score}%
                </p>

                <hr />
              </div>
            ))
          ) : (
            <p>No history found</p>
          )}

        </div>

        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: "20px",
            }}
            width={280}
            height={280}
          />
        )}

      </div>
    </div>
  );
};

export default DashBoard;