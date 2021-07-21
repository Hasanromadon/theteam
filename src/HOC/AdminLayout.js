import React from 'react';
import AdminNav from '../components/Admin/nav/AdminNav';

const AdminLayout = (props) => {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right">
        <h3>{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
