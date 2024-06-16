import toast from "react-hot-toast";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const handleError = (error) => {
  console.error("There was a problem with the fetch operation:", error);
  toast.error("An error occurred. Please try again.");
};

export const getAllUsers = async (fetchAllUsers, setIsLoading) => {
  try {
    const response = await fetch(API_URL);
    const data = await handleResponse(response);
    fetchAllUsers(data);
    setIsLoading(false);
  } catch (error) {
    handleError(error);
  }
};

export const confirmAdd = async (
  newUser,
  addUser,
  setShowAddModal,
  setnewUser,
  initialUserData
) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        company: { name: newUser.company },
        address: { city: newUser.address },
        website: newUser.website,
      }),
    });
    const data = await handleResponse(response);
    addUser(data);
    setShowAddModal(false);
    setnewUser(initialUserData);
    toast.success("New user successfully added");
  } catch (error) {
    handleError(error);
  }
};

export const confirmDelete = async (
  selectedUser,
  deleteUser,
  setShowDeleteModal
) => {
  try {
    const response = await fetch(`${API_URL}/${selectedUser.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await handleResponse(response);
    deleteUser(selectedUser.id);
    setShowDeleteModal(false);
    toast.success("User successfully deleted");
  } catch (error) {
    handleError(error);
  }
};
