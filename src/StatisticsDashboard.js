// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
// import "./styles.css"; // You can reuse existing styles or create dashboard-specific styles.

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28", "#FF4444"];

// const StatisticsDashboard = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/get_statistics")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Error fetching statistics:", err));
//   }, []);

//   if (!stats) return <p>Loading statistics...</p>;

//   const yearData = Object.entries(stats.year_counts).map(([year, count]) => ({
//     year,
//     count
//   }));

//   const techData = Object.entries(stats.tech_stack).map(([tech, count]) => ({
//     name: tech,
//     value: count
//   }));

//   return (
//     <div className="container">
//       <h1>📊 Student Statistics Dashboard</h1>

//       <div className="chart-section">
//   <h2>Number of Students per Year</h2>
//   <div style={{ width: "100%", height: 300 }}>
//   <ResponsiveContainer width="100%" height={300}>
//   <BarChart
//     data={yearData}
//     margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
//   >
//     <XAxis dataKey="year" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//     <Bar dataKey="count" fill="#8884d8" />
//   </BarChart>
// </ResponsiveContainer>

//   </div>
// </div>


// <div className="chart-section">
//   <h2>Average CGPA: {stats.average_cgpa}</h2>
//   <div style={{ width: "100%", height: 300 }}>
//     <ResponsiveContainer>
//       <LineChart data={[{ name: "Average CGPA", CGPA: stats.average_cgpa }]}>
//         <XAxis dataKey="name" />
//         <YAxis domain={[0, 10]} />
//         <Tooltip />
//         <Line type="monotone" dataKey="CGPA" stroke="#82ca9d" />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// </div>


// <div className="chart-section">
//   <h2>Popular Tech Stacks</h2>
//   <div style={{ width: "100%", height: 400 }}>
//     <ResponsiveContainer>
//       <PieChart>
//         <Pie data={techData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#82ca9d" label>
//           {techData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   </div>
// </div>

//     </div>
//   );
// };

// export default StatisticsDashboard;

// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

// const StudentPerformance = ({ query }) => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     if (query) {
//       fetch(`http://127.0.0.1:5000/get_student_stats?query=${query}`)
//         .then((res) => res.json())
//         .then((data) => setStats(data))
//         .catch((err) => console.error("Error fetching stats", err));
//     }
//   }, [query]);

//   if (!stats) return null;

//   const barData = [
//     { name: "CGPA", Student: stats.student.cgpa, ClassAvg: stats.class.average_cgpa },
//     { name: "Leetcode", Student: stats.student.leetcode_count, MaxClass: stats.class.max_leetcode },
//     { name: "GitHub Repos", Student: stats.student.github_repos, MaxClass: stats.class.max_github_repos },
//     { name: "Hackathons", Student: stats.student.hackathon_count, MaxClass: stats.class.max_hackathon_count }
//   ];

//   const radarData = [
//     { metric: "CGPA", Student: stats.student.cgpa, Max: 10 },
//     { metric: "Leetcode", Student: stats.student.leetcode_count, Max: stats.class.max_leetcode },
//     { metric: "GitHub", Student: stats.student.github_repos, Max: stats.class.max_github_repos },
//     { metric: "Hackathons", Student: stats.student.hackathon_count, Max: stats.class.max_hackathon_count },
//   ];

//   return (
//     <div style={{ marginTop: "30px" }}>
//       <h2>📊 Performance Dashboard</h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={barData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Student" fill="#82ca9d" />
//           <Bar dataKey="ClassAvg" fill="#8884d8" />
//           <Bar dataKey="MaxClass" fill="#ffc658" />
//         </BarChart>
//       </ResponsiveContainer>

//       <h3>Radar Chart Overview</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <RadarChart data={radarData}>
//           <PolarGrid />
//           <PolarAngleAxis dataKey="metric" />
//           <PolarRadiusAxis angle={30} domain={[0, "dataMax"]} />
//           <Radar name="Student" dataKey="Student" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//           <Radar name="Max Class" dataKey="Max" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
//           <Legend />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StudentPerformance;
