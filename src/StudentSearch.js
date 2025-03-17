
import React, { useEffect, useState } from "react";
import "./styles.css"; 
import { FaUser } from "react-icons/fa";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  BarChart,
  Bar,
  RadarChart, 
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis, 
  Radar,
  PieChart,
  Pie,
  Cell,
  
  ReferenceLine,
  ReferenceDot,
  AreaChart,
  Area
} from "recharts";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StudentSearch = () => {
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [cgpaData, setCgpaData] = useState([]);
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [scores, setScores] = useState(null);

const cgpaRanges = [
    { range: '6 - 7', count: 0 },
    { range: '7 - 8', count: 0 },
    { range: '8 - 9', count: 0 },
    { range: '9 - 10', count: 0 },
  ];
  
  cgpaData.forEach(student => {
    const cgpa = student.CGPA;
    if (cgpa >= 6 && cgpa < 7) cgpaRanges[0].count++;
    else if (cgpa >= 7 && cgpa < 8) cgpaRanges[1].count++;
    else if (cgpa >= 8 && cgpa < 9) cgpaRanges[2].count++;
    else if (cgpa >= 9 && cgpa <= 10) cgpaRanges[3].count++;
  });
  const leetcodeRanges = [
    { range: '0 - 200', count: 0 },
    { range: '201 - 400', count: 0 },
    { range: '401 - 600', count: 0 },
    { range: '601 - 800', count: 0 },
    { range: '801 - 1000+', count: 0 },
  ];
  
  leetcodeData.forEach(student => {
    const score = student["No.of.Problems Solve(Leetcode)"];
    if (score >= 0 && score <= 200) leetcodeRanges[0].count++;
    else if (score >= 201 && score <= 400) leetcodeRanges[1].count++;
    else if (score >= 401 && score <= 600) leetcodeRanges[2].count++;
    else if (score >= 601 && score <= 800) leetcodeRanges[3].count++;
    else if (score > 800) leetcodeRanges[4].count++;
  });
    
  const calculateScores = (studentData) => {
    const safeValue = (value) => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };
  
    // Academic: CGPA (max 10), 10th Marks (max 100), 12th Marks (max 100)
    let academic = (
      ((safeValue(studentData["CGPA"]) / 10) * 33.33) +
      ((safeValue(studentData["10th Marks"]) / 100) * 33.33) +
      ((safeValue(studentData["12th Marks"]) / 100) * 33.33)
    );
  
    // Technical: Leetcode (300 max), GitHub Repos (10 max), Tech Stacks (10 max)
    let technical = (
      ((safeValue(studentData["No.of.Problems Solve(Leetcode)"]) / 300) * 33.33) +
      ((safeValue(studentData["Github Repositories"]) / 10) * 33.33) +
      ((safeValue(studentData["Tech Stack Count"]) / 10) * 33.33)
    );
  
    // Achievements: Hackathons (max 5), NPTEL (max 5), Projects (max 10)
    let achievements = (
      ((safeValue(studentData["Hackathons"]) / 5) * 33.33) +
      ((safeValue(studentData["NPTEL Completed"]) / 5) * 33.33) +
      ((safeValue(studentData["No. of Projects Done"]) / 10) * 33.33)
    );
  
    // Engagement: Internships (max 3), Clubs (max 3)
    let engagement = (
      ((safeValue(studentData["Internships"]) / 3) * 50) +
      ((safeValue(studentData["Clubs Involved"]) / 3) * 50)
    );
  
    // Overall weighted: Academic 40%, Technical 30%, Achievements 20%, Engagement 10%
    let overall = (academic * 0.4) + (technical * 0.3) + (achievements * 0.2) + (engagement * 0.1);
  
    return { 
      academic, 
      technical, 
      achievements, 
      engagement, 
      overall
    };
  };
  
    
  
  useEffect(() => {
    if (student) {
      const calculated = calculateScores(student);
      setScores(calculated);
    }
  }, [student]);

  const fetchStudent = async () => {
    setError("");
    setStudent(null);
    setScores(null);
  
    try {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        setError("Please enter a student name or register number!");
        return;
      }
  
      const response = await fetch(`http://127.0.0.1:5000/get_student?query=${trimmedQuery}`);
      const data = await response.json();
  
      if (data.message) {
        setError("Student not found!");
      } else {
        setStudent(data.student);
        setCgpaData(data.cgpa_data);
        setLeetcodeData(data.leetcode_data);
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      setError("Error fetching student data!");
    }
  };
  

  return (
    <div className={`container ${student ? "with-margin" : "2000px"}`}>
      <div className="search-card" style={{marginTop:"1700px"}}>
        <h1>🔍 Search Student Details</h1>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Student Name or Register Number"
          />
          <button onClick={fetchStudent}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {student && (
          <div className="student-details">
            <h2>🎓 Student Details</h2>
            <table>
              <tbody>
                <tr><td><strong>Name:</strong></td><td>{student.Name || "N/A"}</td></tr>
                <tr><td><strong>Year:</strong></td><td>{student.Year || "N/A"}</td></tr>
                <tr><td><strong>Register Number:</strong></td><td>{student["Register Number"] || "N/A"}</td></tr>
                <tr><td><strong>College Email:</strong></td><td>{student["College Email ID"] || "N/A"}</td></tr>
                <tr><td><strong>Personal Email:</strong></td><td>{student["Personal Email ID"] || "N/A"}</td></tr>
                <tr><td><strong>Phone Number:</strong></td><td>{student["Phone number"] || "N/A"}</td></tr>
              <tr>
  <td><strong>Leetcode ID:</strong></td>
   <td>
   {student["Leetcode ID"] ? (
      <a
        href={`https://leetcode.com/${student["Leetcode ID"]}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        {student["Leetcode ID"]}
      </a>
    ) : "N/A"}
  </td>
</tr>
                <tr><td><strong>LinkedIn:</strong></td><td>
                  {student["LinkedIn ID"] ? (
                    <a href={`https://www.linkedin.com/in/${student["LinkedIn ID"]}`} target="_blank" rel="noopener noreferrer">
                      {student["LinkedIn ID"]}
                    </a>
                  ) : "N/A"}
                </td></tr>
                <tr><td><strong>Personal Email:</strong></td><td>{student["Personal Email ID"] || "N/A"}</td></tr>
              <tr><td><strong>Phone Number:</strong></td><td>{student["Phone number"] || "N/A"}</td></tr>
              <tr>
  <td><strong>Leetcode ID:</strong></td>
  <td>
    {student["Leetcode ID"] ? (
      <a
        href={`https://leetcode.com/${student["Leetcode ID"]}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        {student["Leetcode ID"]}
      </a>
    ) : "N/A"}
  </td>
</tr>

              <tr><td><strong>Problems Solved (Leetcode):</strong></td><td>{student["No.of.Problems Solve(Leetcode)"] || "N/A"}</td></tr>
             
              <tr>
  <td><strong>CodeChef ID:</strong></td>
  <td>
    {student["Codechef ID"] ? (
      <a
        href={`https://www.codechef.com/users/${student["Codechef ID"]}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        {student["Codechef ID"]}
      </a>
    ) : "N/A"}
  </td>
</tr>

              <tr><td><strong>Codeforces ID:</strong></td><td>{student["Codeforce ID"] || "N/A"}</td></tr>
              <tr>
  <td><strong>Codeforces ID:</strong></td>
  <td>
    {student["Codechef ID"] ? (
      <a
        href={`hhttps://codeforces.com/profile/${student["Codeforce ID"]}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        {student["Codeforce ID"]}
      </a>
    ) : "N/A"}
  </td>
</tr>
              <tr>
                <td><strong>LinkedIn:</strong></td>
                <td>
                  {student["LinkedIn ID"] ? (
                    <a
                      href={student["LinkedIn ID"].startsWith("http") ? student["LinkedIn ID"] : `https://www.linkedin.com/in/${student["LinkedIn ID"]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {student["LinkedIn ID"]}
                    </a>
                  ) : "N/A"}
                </td>
              </tr>
              <tr><td><strong>CGPA:</strong></td><td>{student.CGPA || "N/A"}</td></tr>
              <tr><td><strong>Arrears:</strong></td><td>{student["History Of Arrears(If Any)"] || "N/A"}</td></tr>
              <tr><td><strong>Quota:</strong></td><td>{student["Quota (GQ, MQ, Lateral Entry)"] || "N/A"}</td></tr>
              <tr><td><strong>Foreign Languages:</strong></td><td>{student["Foreign Language(s)"] || "N/A"}</td></tr>
              <tr>
                <td><strong>Hackathons:</strong></td>
                <td>
                  {student["Hackathon participated"]
                    ? student["Hackathon participated"].split("\n").map((hackathon, index) => (
                        <div key={index}>{hackathon.trim()}</div>
                      ))
                    : "N/A"}
                </td>
              </tr>
              <tr><td><strong>NPTEL Courses:</strong></td><td>{student["No.Of.NPTEL Courses Completed"] || "N/A"}</td></tr>
              <tr>
                <td><strong>Tech Stack:</strong></td>
                <td>
                  {student["Teck Stack Known "]
                    ? student["Teck Stack Known "].split("\n").map((tech, index) => (
                        <div key={index}>{tech.trim()}</div>
                      ))
                    : "N/A"}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {student && ( 
  <div className="photo-container">
    {student.Photo ? (
      <img className="photo-box" src={student.Photo} alt="Student" />
    ) : (
      <div className="photo-box">
        <FaUser className="photo-icon" />
      </div>
    )}
    <p className="photo-label">{student.Name || "N/A"}</p>
  </div>
)};
  {scores && (
    <div className="space-y-8">
      <h2 className="text-2xl font-extrabold text-center text-gray-800">📊 Performance Overview</h2>
        {/* Pie Chart */}
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={[
              { name: "Academic", value: scores.academic },
              { name: "Technical", value: scores.technical },
              { name: "Achievements", value: scores.achievements },
              { name: "Engagement", value: scores.engagement }
            ]}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill="#6366f1" />
            <Cell fill="#ec4899" />
            <Cell fill="#10b981" />
            <Cell fill="#f59e0b" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>



    {/* Progress Circle */}
    <h3 className="section-subtitle">⭐ Overall Score</h3>
    <div className="chart-wrapper small">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={[
              { name: "Overall Score", value: scores.overall },
              { name: "Remaining", value: 100 - scores.overall }
            ]}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill="#00C49F" />
            <Cell fill="#eee" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

         {/* Bar Chart */}
    <h3 className="section-subtitle">📈 Category-wise Scores</h3>
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={[
          { category: "Academic", score: scores.academic },
          { category: "Technical", score: scores.technical },
          { category: "Achievements", score: scores.achievements },
          { category: "Engagement", score: scores.engagement }
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
      )}
{student && (
  <>
   
   <h2>🎯 CGPA Distribution</h2>
   <ResponsiveContainer width="100%" height={300}>
  <LineChart data={cgpaRanges}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="range" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="count" stroke="#4B9CD3" strokeWidth={3} dot={{ r: 6 }} name="Class Distribution" />

    {/* Student CGPA Marker */}
    {student && (
      <ReferenceDot 
        x={
          student.CGPA >= 6 && student.CGPA < 7
            ? '6 - 7'
            : student.CGPA >= 7 && student.CGPA < 8
            ? '7 - 8'
            : student.CGPA >= 8 && student.CGPA < 9
            ? '8 - 9'
            : '9 - 10'
        }
        y={cgpaRanges.find(d => d.range === (
          student.CGPA >= 6 && student.CGPA < 7
            ? '6 - 7'
            : student.CGPA >= 7 && student.CGPA < 8
            ? '7 - 8'
            : student.CGPA >= 8 && student.CGPA < 9
            ? '8 - 9'
            : '9 - 10'
        ))?.count}
        r={8}
        fill="red"
        label={{ value: `${student.Name}'s CGPA`, position: "top", fill: "red" }}
      />
    )}
  </LineChart>
</ResponsiveContainer>


    {/* Leetcode Comparison */}
    {/* Leetcode Distribution */}
<h2>🧑‍💻Coding Skill</h2>
<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={leetcodeRanges}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="range" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Legend />
    <Area type="monotone" dataKey="count" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Class Distribution" />

    {/* Student Leetcode Marker */}
    {student && (
      <ReferenceDot 
        x={
          student["No.of.Problems Solve(Leetcode)"] <= 200
            ? '0 - 200'
            : student["No.of.Problems Solve(Leetcode)"] <= 400
            ? '201 - 400'
            : student["No.of.Problems Solve(Leetcode)"] <= 600
            ? '401 - 600'
            : student["No.of.Problems Solve(Leetcode)"] <= 800
            ? '601 - 800'
            : '801 - 1000+'
        }
        y={leetcodeRanges.find(d => d.range === (
          student["No.of.Problems Solve(Leetcode)"] <= 200
            ? '0 - 200'
            : student["No.of.Problems Solve(Leetcode)"] <= 400
            ? '201 - 400'
            : student["No.of.Problems Solve(Leetcode)"] <= 600
            ? '401 - 600'
            : student["No.of.Problems Solve(Leetcode)"] <= 800
            ? '601 - 800'
            : '801 - 1000+'
        ))?.count}
        r={8}
        fill="red"
        label={{ value: `${student.Name}'s Score`, position: "top", fill: "red" }}
      />
    )}
  </AreaChart>
</ResponsiveContainer>


  </>
)}


      </div>
    
  );
};

export default StudentSearch;
