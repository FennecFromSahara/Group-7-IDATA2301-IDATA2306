const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: "20px" }}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
