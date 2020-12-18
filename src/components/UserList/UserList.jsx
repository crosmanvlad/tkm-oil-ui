import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MdOpenInNew } from 'react-icons/md';
import UserService from '../../services/UserService';
import Loading from '../Loading/Loading';
import './UserList.scss';

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const usersResponse = await UserService.getUsers();
      setIsLoading(false);
      if (usersResponse) {
        setUsers(usersResponse);
      }
    };
    getUsers();
  }, []);

  const handleClick = (id) => {
    history.push(`/user/${id}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-user-list">
        <div className="title">Lista Utilizatori</div>
        <TableContainer className="table-container" component={Paper}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Nume</TableCell>
                <TableCell align="left">Prenume</TableCell>
                <TableCell align="left">Rol</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {users.map((user, i) => (
                <TableRow key={user.email}>
                  <TableCell align="center" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.lastName}</TableCell>
                  <TableCell align="left">{user.firstName}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="center">
                    <MdOpenInNew size={20} onClick={() => handleClick(user.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UserList;
