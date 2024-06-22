const { client } = require("../lib/database.config.js");
const {
  createUsersTableQuery,
  fetchUsersQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
  seedUsersQuery
} = require("../queries/user.queries.js");
// Fetch all users
async function getAllUsers(req, res) {
  try {
    await client.query(createUsersTableQuery)
    const data = await client.query(fetchUsersQuery);
    if(data.rows.length > 0){
        res.send(data.rows);
    }else{
        await client.query(seedUsersQuery)
        res.send(data.rows);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

// Fetch single user by ID
async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const data = await client.query(fetchSingleUserQuery(userId));
    if (data.rows.length > 0) {
      res.send(data.rows[0]);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

// Create a new user
async function createUser(req, res) {
  const newUser = req.body;
  try {
    await client.query(createUserQuery(newUser));
    res.send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    await client.query(updateUserQuery(userId, updatedData));
    res.send({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await client.query(deleteUserQuery(userId));
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
