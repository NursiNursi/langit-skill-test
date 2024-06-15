import { Col, Container, Row, Table } from "react-bootstrap";

import { fetchAllUsers } from "../redux/actions/userActions";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { connect } from "react-redux";

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
      <Row>
        <Col>
          <Table hover responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Address</th>
                <th>Company</th>
                <th>Website</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{`${user.address.suite}, ${user.address.street}, ${user.address.city}`}</td>
                  <td>{user.company.name}</td>
                  <td>{user.website}</td>
                  <td>
                    <Row>
                      <Col>
                        <AiFillEye color="dodgerblue" role="button" />
                      </Col>
                      <Col>
                        <AiFillEdit color="dodgerblue" role="button" />
                      </Col>
                      <Col>
                        <AiFillDelete color="red" role="button" />
                      </Col>
                    </Row>
                  </td>
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
