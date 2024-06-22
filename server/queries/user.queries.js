const createUsersTableQuery = {
  text: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      picture TEXT,
      email VARCHAR(100) NOT NULL,
      access_token VARCHAR(255) NOT NULL,
      location_lat FLOAT,
      location_lng FLOAT,
      is_visible BOOLEAN DEFAULT false
  );`,
};

const seedUsersQuery = {
    text: `INSERT INTO users (full_name, picture, email, access_token, location_lat, location_lng, is_visible) VALUES
      ('Alice Smith', 'https://th.bing.com/th/id/R.0c7db36fe3f7af9d9fd519891dfbddb9?rik=zxMOBftjh5eilQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-NizfwDxfzNI%2fULgdM3cQNDI%2fAAAAAAAAAQA%2fn0fGQZHPRKI%2fs1600%2fECMC_BUNDLE_100001871_large.jpg&ehk=510MSBqDi8RlFmuutk6cuzPe9pV1EZutUEDYqdraLqY%3d&risl=&pid=ImgRaw&r=0', 'alice@example.com', 'access_token_alice', 40.7128, -74.0060, true),
      ('Bob Johnson', 'https://th.bing.com/th/id/R.0c7db36fe3f7af9d9fd519891dfbddb9?rik=zxMOBftjh5eilQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-NizfwDxfzNI%2fULgdM3cQNDI%2fAAAAAAAAAQA%2fn0fGQZHPRKI%2fs1600%2fECMC_BUNDLE_100001871_large.jpg&ehk=510MSBqDi8RlFmuutk6cuzPe9pV1EZutUEDYqdraLqY%3d&risl=&pid=ImgRaw&r=0','bob@example.com', 'access_token_bob', 34.0522, -118.2437, false),
      ('Carol Williams', 'https://th.bing.com/th/id/R.0c7db36fe3f7af9d9fd519891dfbddb9?rik=zxMOBftjh5eilQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-NizfwDxfzNI%2fULgdM3cQNDI%2fAAAAAAAAAQA%2fn0fGQZHPRKI%2fs1600%2fECMC_BUNDLE_100001871_large.jpg&ehk=510MSBqDi8RlFmuutk6cuzPe9pV1EZutUEDYqdraLqY%3d&risl=&pid=ImgRaw&r=0','carol@example.com', 'access_token_carol', 37.7749, -122.4194, true);`
  };

const fetchUsersQuery = {
  text: `SELECT * FROM users;
  `,
};

const fetchSingleUserQuery = (id) => {
  return {
    text: `SELECT * FROM users WHERE id=$1`,
    values: [id],
  };
};

const createUserQuery = (body) => {
  return {
    text: `INSERT INTO users (full_name, picture, email, access_token, location_lat, location_lng, is_visible) VALUES
      ($1, $2, $3, $4, $5, $6)`,
    values: [
      body.full_name,
      body.picture,
      body.email,
      body.access_token,
      body.location_lat,
      body.location_lng,
      body.is_visible,
    ],
  };
};

const updateUserQuery = (uid, newData) => {
  return {
    text: `UPDATE users SET full_name = $1, picture = $2 email = $3, access_token = $4, location_lat = $5, location_lng = $6, is_visible = $7 WHERE id = $7`,
    values: [
      newData.full_name,
      newData.picture,
      newData.email,
      newData.access_token,
      newData.location_lat,
      newData.location_lng,
      newData.is_visible,
      uid,
    ],
  };
};

const deleteUserQuery = (uid) => {
  return {
    text: "DELETE FROM users WHERE id = $1",
    values: [uid],
  };
};

module.exports = {
  createUsersTableQuery,
  fetchUsersQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
  seedUsersQuery
};
