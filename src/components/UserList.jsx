import { Button, Col, Container, Row, Table } from "react-bootstrap";

import { deleteUser, fetchAllUsers } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddUser from "./AddUser";
import { AiFillDelete } from "react-icons/ai";
import ModalComponent from "./ui/ModalComponent";

function UserList({ userData, fetchAllUsers, deleteUser }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleDelete = (userInfo) => {
    setShowDeleteModal(true);
    setSelectedUser(userInfo);
  };

  const confirmDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok === true) {
          deleteUser(selectedUser.id);
        }
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
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
                  <th>Action</th>
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
                    <td>
                      <Button
                        onClick={() => handleDelete(user)}
                        variant="outline-danger"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AiFillDelete
                            size={20}
                            style={{ marginRight: "5px" }}
                          />
                          Delete
                        </div>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {showDeleteModal && (
        <ModalComponent
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={confirmDelete}
          title="Delete User"
          content="Are you sure you want to delete this user ?"
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}
    </>
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
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
