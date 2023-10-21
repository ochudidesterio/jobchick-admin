import React from 'react';

const RolesList = ({ roles }) => {
  if (roles.length === 0) {
    return <div>No roles available.</div>;
  }

  return (
    <div >
      <h4>Roles and Responsibilities:</h4>
      <ol>
        {roles.map((role) => (
          <li key={role.id}>{role.role}</li>
        ))}
      </ol>
    </div>
  );
};

export default RolesList;

