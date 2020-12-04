import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CollectionService from '../../services/CollectionService';
import Loading from '../Loading/Loading';
import './MyCollections.scss';

const MyCollections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      setIsLoading(true);
      const collectionsResponse = await CollectionService.getMyCollections();
      setIsLoading(false);
      if (collectionsResponse) {
        setCollections(collectionsResponse);
      }
    };
    getCollections();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-my-collections">
        <div className="title">Colectarile mele</div>
        <TableContainer className="table-container" component={Paper}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Firma</TableCell>
                <TableCell align="right">Denumire&nbsp;Locatie</TableCell>
                <TableCell align="right">Numar&nbsp;Anexa</TableCell>
                <TableCell align="right">Cantitate</TableCell>
                <TableCell align="right">Data&nbsp;Colectare</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {collections.map((collection, i) => (
                <TableRow key={`${collection.location}${collection.createdDate}`}>
                  <TableCell align="center" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="right">{collection.firm}</TableCell>
                  <TableCell align="right">{collection.location}</TableCell>
                  <TableCell align="right">{collection.anexaNum}</TableCell>
                  <TableCell align="right">{collection.quantity}</TableCell>
                  <TableCell align="right">
                    <TextField className="date input" type="date" value={collection.date.split('T')[0]} />
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

export default MyCollections;
