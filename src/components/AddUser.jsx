import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";

import { connect } from "react-redux";
import { addUser } from "../redux/actions/userActions";
import { confirmAdd } from "../service/api";

import ModalComponent from "./ui/ModalComponent";

const initialUserData = {
  name: "",
  email: "",
  company: "",
  address: "",
  website: "",
};

const AddUser = ({ userData, addUser }) => {
  const [newUser, setnewUser] = useState(initialUserData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  return (
    <>
      <Col>
        <Button variant="outline-primary" className="pe-none">
          All Users{" "}
          <span className="badge bg-secondary">{userData.length}</span>
        </Button>
      </Col>
      <Col className="text-end">
        <Button variant="primary" onClick={handleAdd}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiFillPlusCircle size={20} style={{ marginRight: "5px" }} />
            Add user
          </div>
        </Button>
      </Col>

      {showAddModal && (
        <ModalComponent
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          confirmAction={() =>
            confirmAdd(
              newUser,
              addUser,
              setShowAddModal,
              setnewUser,
              initialUserData
            )
          }
          title="Add new user"
          content={
            <NewUserFormComponent newUser={newUser} setnewUser={setnewUser} />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={newUser.nama === "" || newUser.alamat === ""}
        />
      )}
    </>
  );
};

const NewUserFormComponent = ({ newUser, setnewUser }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={newUser.name}
            onChange={(e) => setnewUser({ ...newUser, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={newUser.email}
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            name="company"
            value={newUser.company.name}
            onChange={(e) =>
              setnewUser({ ...newUser, company: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="city"
            value={newUser.address.city}
            onChange={(e) =>
              setnewUser({ ...newUser, address: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter website"
            name="website"
            value={newUser.website}
            onChange={(e) =>
              setnewUser({ ...newUser, website: e.target.value })
            }
            required
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
