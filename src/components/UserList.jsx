import { Col, Container, Row, Table } from "react-bootstrap";

import { fetchAllUsers } from "../redux/actions/userActions";
import { useEffect } from "react";
import { connect } from "react-redux";
import AddUser from "./AddUser";

function UserList({ userData, fetchAllUsers }) {
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        fetchAllUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, [fetchAllUsers]);

  return (
    <Container>
      <Row className="py-5 mt-5">
        <AddUser />
      </Row>
      <Row>
        <Col>
          <Table hover responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Company</th>
                <th>City</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>{user.address.city}</td>
                  <td>{user.website}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (data) => dispatch(fetchAllUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
