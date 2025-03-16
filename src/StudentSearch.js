// import React, { useState, useEffect } from "react";
// import "./styles.css";
// import { FaUser } from "react-icons/fa";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
// } from "recharts";

// const StudentSearch = () => {
//   const [query, setQuery] = useState("");
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState("");
//   const [allStudents, setAllStudents] = useState([]);

//   const fetchStudent = async () => {
//     setError("");
//     setStudent(null);

//     try {
//       const trimmedQuery = query.trim();
//       if (!trimmedQuery) {
//         setError("Please enter a student name or register number!");
//         return;
//       }

//       const response = await fetch(`http://127.0.0.1:5000/get_student?query=${trimmedQuery}`);
//       const data = await response.json();

//       if (data.message) {
//         setError("Student not found!");
//       } else {
//         setStudent(data);
//       }
//     } catch (err) {
//       console.error("Error fetching student:", err);
//       setError("Error fetching student data!");
//     }
//   };

//   useEffect(() => {
//     const fetchAllStudents = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/get_all_students`);
//         const data = await response.json();
//         setAllStudents(data.students);
//       } catch (err) {
//         console.error("Error fetching all students data!");
//       }
//     };
//     fetchAllStudents();
//   }, []);

//   const getHackathonCount = (hackathonString) => {
//     if (!hackathonString) return 0;
//     return hackathonString.split("\n").filter(h => h.trim() !== "").length;
//   };

//   const prepareChartData = () => {
//     if (!student || allStudents.length === 0) return [];

//     const maxCGPA = Math.max(...allStudents.map(s => parseFloat(s.CGPA) || 0));
//     const maxRepos = Math.max(...allStudents.map(s => parseInt(s["GitHub Repositories Count"] || "0")));
//     const maxLeet = Math.max(...allStudents.map(s => parseInt(s["No.of.Problems Solve(Leetcode)"] || "0")));
//     const maxHackathons = Math.max(...allStudents.map(s => getHackathonCount(s["Hackathon participated"])));

//     const studentHackathonCount = getHackathonCount(student["Hackathon participated"]);

//     return [
//       { metric: "CGPA", Student: parseFloat(student.CGPA) || 0, Max: maxCGPA },
//       { metric: "GitHub Repos", Student: parseInt(student["GitHub Repositories Count"] || "0"), Max: maxRepos },
//       { metric: "LeetCode Solved", Student: parseInt(student["No.of.Problems Solve(Leetcode)"] || "0"), Max: maxLeet },
//       { metric: "Hackathons", Student: studentHackathonCount, Max: maxHackathons },
//     ];
//   };

//   return (
//     <div className="container">
//       <div className="search-card">
//         <h1>🔍 Search Student Details</h1>
//         <div className="search-box">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Enter Student Name or Register Number"
//           />
//           <button onClick={fetchStudent}>Search</button>
//         </div>

//         {error && <p className="error">{error}</p>}

//         {student && (
//           <>
//             <div className="student-details">
//               <h2>🎓 Student Details</h2>
//               <table>
//                 <tbody>
//                   <tr><td><strong>Name:</strong></td><td>{student.Name || "N/A"}</td></tr>
//                   <tr><td><strong>Year:</strong></td><td>{student.Year || "N/A"}</td></tr>
//                   <tr><td><strong>Register Number:</strong></td><td>{student["Register Number"] || "N/A"}</td></tr>
//                   <tr><td><strong>College Email:</strong></td><td>{student["College Email ID"] || "N/A"}</td></tr>
//                   <tr><td><strong>Personal Email:</strong></td><td>{student["Personal Email ID"] || "N/A"}</td></tr>
//                   <tr><td><strong>Phone Number:</strong></td><td>{student["Phone number"] || "N/A"}</td></tr>

//                   <tr>
//                     <td><strong>Leetcode ID:</strong></td>
//                     <td>
//                       {student["Leetcode ID"] ? (
//                         <a
//                           href={`https://leetcode.com/${student["Leetcode ID"]}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ color: "blue", textDecoration: "underline" }}
//                         >
//                           {student["Leetcode ID"]}
//                         </a>
//                       ) : "N/A"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <td><strong>LinkedIn:</strong></td>
//                     <td>
//                       {student["LinkedIn ID"] ? (
//                         <a
//                           href={student["LinkedIn ID"].startsWith("http") ? student["LinkedIn ID"] : `https://www.linkedin.com/in/${student["LinkedIn ID"]}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ color: "blue", textDecoration: "underline" }}
//                         >
//                           {student["LinkedIn ID"]}
//                         </a>
//                       ) : "N/A"}
//                     </td>
//                   </tr>

//                   <tr><td><strong>Problems Solved (Leetcode):</strong></td><td>{student["No.of.Problems Solve(Leetcode)"] || "N/A"}</td></tr>

//                   <tr>
//                     <td><strong>CodeChef ID:</strong></td>
//                     <td>
//                       {student["Codechef ID"] ? (
//                         <a
//                           href={`https://www.codechef.com/users/${student["Codechef ID"]}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ color: "blue", textDecoration: "underline" }}
//                         >
//                           {student["Codechef ID"]}
//                         </a>
//                       ) : "N/A"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <td><strong>Codeforces ID:</strong></td>
//                     <td>
//                       {student["Codeforce ID"] ? (
//                         <a
//                           href={`https://codeforces.com/profile/${student["Codeforce ID"]}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ color: "blue", textDecoration: "underline" }}
//                         >
//                           {student["Codeforce ID"]}
//                         </a>
//                       ) : "N/A"}
//                     </td>
//                   </tr>

//                   <tr><td><strong>CGPA:</strong></td><td>{student.CGPA || "N/A"}</td></tr>
//                   <tr><td><strong>Arrears:</strong></td><td>{student["History Of Arrears(If Any)"] || "N/A"}</td></tr>
//                   <tr><td><strong>Quota:</strong></td><td>{student["Quota (GQ, MQ, Lateral Entry)"] || "N/A"}</td></tr>
//                   <tr><td><strong>Foreign Languages:</strong></td><td>{student["Foreign Language(s)"] || "N/A"}</td></tr>

//                   <tr>
//                     <td><strong>Hackathons:</strong></td>
//                     <td>
//                       {student["Hackathon participated"]
//                         ? student["Hackathon participated"].split("\n").map((hackathon, index) => (
//                           <div key={index}>{hackathon.trim()}</div>
//                         ))
//                         : "N/A"}
//                     </td>
//                   </tr>

//                   <tr><td><strong>NPTEL Courses:</strong></td><td>{student["No.Of.NPTEL Courses Completed"] || "N/A"}</td></tr>

//                   <tr>
//                     <td><strong>Tech Stack:</strong></td>
//                     <td>
//                       {student["Teck Stack Known "]
//                         ? student["Teck Stack Known "].split("\n").map((tech, index) => (
//                           <div key={index}>{tech.trim()}</div>
//                         ))
//                         : "N/A"}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="photo-container">
//               {student.Photo ? (
//                 <img className="photo-box" src={student.Photo} alt="Student" />
//               ) : (
//                 <div className="photo-box">
//                   <FaUser className="photo-icon" />
//                 </div>
//               )}
//               <p className="photo-label">{student.Name || "N/A"}</p>
//             </div>

//             {/* Charts */}
//             <h2 style={{ marginTop: "40px", textAlign: "center" }}>📊 Performance Dashboard</h2>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <ResponsiveContainer width="80%" height={400}>
//                 <BarChart data={prepareChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="metric" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="Student" fill="#8884d8" />
//                   <Bar dataKey="Max" fill="#82ca9d" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
//               <ResponsiveContainer width="80%" height={400}>
//                 <RadarChart data={prepareChartData()}>
//                   <PolarGrid />
//                   <PolarAngleAxis dataKey="metric" />
//                   <PolarRadiusAxis />
//                   <Radar name="Student" dataKey="Student" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                   <Radar name="Max Class Performance" dataKey="Max" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
//                   <Legend />
//                 </RadarChart>
//               </ResponsiveContainer>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentSearch;

{/* {
import React, { useState } from "react";
import "./styles.css"; 
import { FaUser } from "react-icons/fa";
const StudentSearch = () => {
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    setError("");
    setStudent(null);

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
        setStudent(data);
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      setError("Error fetching student data!");
    }
  };

  return (
    <div className="container">
      <div className="search-card">
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
)}

      </div>
    
  );
};

export default StudentSearch; */} 

