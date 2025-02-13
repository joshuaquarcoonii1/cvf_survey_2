import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { motion } from "framer-motion";
import "./Admin.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch("/responses"); // Update with your actual backend URL
        const data = await response.json();
  
        if (response.ok) {
          const formattedUsers = data.map((item) => ({
            age: item.age || "N/A",
            gender: item.gender || "N/A",
            department: item.department || "N/A",
            yearsWorked: item.yearsOfExperience|| "N/A",
            responses: item.responses?.questionId?.questionText || "No response",
          }));
  
          setUsers(formattedUsers);
        } else {
          console.error("Error fetching responses:", data.message);
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };
  
    fetchResponses();
  }, []);
  

  const headers = [
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Department", key: "department" },
    { label: "Years Worked", key: "yearsWorked" },
    { label: "Responses", key: "responses" },
  ];

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Welcome Admin </h2>
        <motion.table
          className="admin-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.department}</td>
                <td>{user.yearsWorked}</td>
                <td>{user.responses}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
        <div className="export-button-container">
          <CSVLink data={users} headers={headers} filename="users_data.csv">
            <button className="export-button">Export to CSV</button>
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
