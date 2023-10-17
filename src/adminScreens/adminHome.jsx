import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  InputAdornment,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Paper,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "./navbar"


const AdminHome = () => {
  // const deleteUser = async (id, name) => {
  //   const confirmDelete = window.confirm(`Are you sure you want to delete ${name}`);
  //   if (confirmDelete) {
  //     await axios.delete(`api/admin/deleteUser/${id}`);
  //     setUsers((undeletedUsers) => undeletedUsers.filter((user) => user._id !== id));
  //     toast.success('User deleted successfully');
  //   } else {
  //     toast.error('User not deleted');
  //   }
  // };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const handleShowCreateUserModal = () => setShowCreateUserModal(true);
  const handleCloseCreateUserModal = () => setShowCreateUserModal(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '', // Add password field
  });

  // const createUser = () => {
  //   // Send a POST request to your API to create the user
  //   axios
  //     .post('api/admin/createUser', newUser)
  //     .then((res) => {
  //       setUsers([...users, res.data]); // Assuming the response includes the created user
  //       toast.success('User created successfully');
  //       handleClose();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       toast.error('Error creating user');
  //     });
  // };

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const [update, setUpdate] = useState({ name: '', email: '' });

  const editUser = (user) => {
    setUpdate(user);
    handleOpen();
  };

  // const editChange = (e) => {
  //   e.preventDefault();
  //   const id = update._id;
  //   axios
  //     .put(`api/admin/editUser/${id}`, update)
  //     .then((res) => {
  //       setUsers((prevUsers) => {
  //         return prevUsers.map((user) => {
  //           if (user._id === id) {
  //             return {
  //               ...user,
  //               name: update.name,
  //               email: update.email,
  //             };
  //           }
  //           return user;
  //         });
  //       });
  //       toast.success('Successfully Updated User');
  //       handleClose();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  /*to get users from databse by fetch */
  useEffect(() => {
    axios.get('http://localhost:3001/admin/findUsers').then((res) => {
      setUsers(res.data);
    });
  }, []);

  const filteredData = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
    <Navbar/>

    <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
    

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className="row table-responsive col-lg-12">
        <TableContainer component={Paper}>
          <Table style={{ width: '100%' }} id="productsTable">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CreateIcon />}
                      onClick={() => editUser(user)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      // onClick={() => deleteUser(user._id, user.name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleShowCreateUserModal}>
          Create New User
        </Button>
      </div>
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <h2>Edit User Details</h2>
          <div className="form-group">
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={update.name}
              onChange={(e) => setUpdate({ ...update, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              value={update.email}
              onChange={(e) => setUpdate({ ...update, email: e.target.value })}
              placeholder="email"
            />
          </div>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" /*onClick={editChange}*/>
            Save Changes
          </Button>
        </div>
      </Modal>

      <Modal open={showCreateUserModal} onClose={handleCloseCreateUserModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <h2>Create New User</h2>
          <div className="form-group">
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="password"
            />
          </div>
          <Button variant="contained" color="secondary" onClick={handleCloseCreateUserModal}>
            Close
          </Button>
          <Button variant="contained" color="primary" /*onClick={createUser}*/>
            Create User
          </Button>
        </div>
      </Modal>
    </Paper>
    </>

  );
};

export default AdminHome;
