import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/students") // replace with your API endpoint
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  // Prepare data
  const topLeetcode = [...students]
    .sort((a, b) => b.leetcode - a.leetcode)
    .slice(0, 10)
    .map(student => ({ name: student.name, leetcode: student.leetcode }));

  const cgpaData = [
    { name: 'CGPA > 9', value: students.filter(s => s.cgpa > 9).length },
    { name: 'CGPA 8-9', value: students.filter(s => s.cgpa >= 8 && s.cgpa <= 9).length },
    { name: 'CGPA < 8', value: students.filter(s => s.cgpa < 8).length },
  ];

  const yearData = [
    { name: '1st Year', value: students.filter(s => s.year === '1st').length },
    { name: '2nd Year', value: students.filter(s => s.year === '2nd').length },
    { name: '3rd Year', value: students.filter(s => s.year === '3rd').length },
    { name: '4th Year', value: students.filter(s => s.year === '4th').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Student Analytics Dashboard</h2>

      {/* Top Leetcode Solvers */}
      <div className="mb-8">
        <h3 className="text-xl mb-2">Top 10 Students - Leetcode Problems Solved</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topLeetcode}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="leetcode" fill="#001a57" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CGPA Distribution */}
      <div className="mb-8">
        <h3 className="text-xl mb-2">CGPA Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={cgpaData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {cgpaData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Year-wise student distribution */}
      <div>
        <h3 className="text-xl mb-2">Student Count by Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={yearData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {yearData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
