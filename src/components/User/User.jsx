import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './User.scss';

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [role, setRole] = useState('');
  // const [password, setPassword] = useState('');
  // const [totalQuantity, setTotalQuantity] = useState();
  // const [edit, setEdit] = useState(false);
  // const [editPassword, setEditPassword] = useState(false);
  // const { userId } = useParams();
  // const history = useHistory();
  // const date = new Date();
  // const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
  // const [from, setFrom] = useState(firstDay.toISOString().split('T')[0]);
  // const [to, setTo] = useState(date.toISOString().split('T')[0]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-user">
        <div className="title">Profil utilizator</div>
        {/* <div className="content">

        </div> */}
      </div>
    </>
  )
};

export default User;
