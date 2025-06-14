import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";

import * as coursesClient from "../client";

export default function PeopleTable() {
  const { cid } = useParams();
  const [enrolledUsers, setEnrolledUsers] = useState([]);

  // Use courses.fetchAllEnrolledUsers(cid) to fetch enrolled users
  const fetchAllEnrolledUsers = async () => {
    try {
      const response = await coursesClient.findEnrolledUsersInCourse(cid);
      setEnrolledUsers(response);
    } catch (error) {
      console.error("Error fetching enrolled users:", error);
    }
  };

  // Fetch enrolled users when the component mounts
  useEffect(() => {
    fetchAllEnrolledUsers();
  }, [cid]);

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers &&
            enrolledUsers.map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
