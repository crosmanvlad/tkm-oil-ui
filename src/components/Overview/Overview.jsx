import React, { useEffect, useState, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MdClose, MdCheck, MdEdit, MdDelete, MdRefresh } from 'react-icons/md';
import { CSVLink } from 'react-csv';
import CollectionService from '../../services/CollectionService';
import Loading from '../Loading/Loading';
import './Overview.scss';

const Overview = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
  const [collections, setCollections] = useState([]);
  const [callsNum, setCallsNum] = useState(0);
  const [query, setQuery] = useState('');
  const [from, setFrom] = useState(firstDay.toISOString().split('T')[0]);
  const [to, setTo] = useState(date.toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [filterUsed, setFilterUsed] = useState(false);
  const [editSelected, setEditSelected] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState(null);
  const [collectionToEdit, setCollectionToEdit] = useState({});
  const [dataToExport, setDataToExport] = useState([]);
  const csvLinkRef = useRef();
  const [isError, setIsError] = useState({
    firm: false,
    location: false,
    anexNum: false,
    qunatity: false,
    date: false
  });

  const headers = [
    { label: 'Firma', key: 'firm' },
    { label: 'Denumire Locatie', key: 'location' },
    { label: 'Numar Anexa', key: 'anexaNum' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'User', key: 'person' },
    { label: 'Data Colectarii', key: 'date' },
    { label: 'Data Inregistrata', key: 'createdDate' }
  ];

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const getCollectionsResponse = await CollectionService.getCollections();
      setIsLoading(false);
      if (getCollectionsResponse) {
        setShowLoadMore(true);
        setCallsNum(1);
        setCollections(getCollectionsResponse);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setIsError({
      firm: false,
      location: false,
      anexNum: false,
      qunatity: false,
      date: false
    });
  }, [collectionToEdit]);

  const validateInput = (value, field) => {
    let valid = true;
    if (!value) {
      valid = false;
      setIsError((prevValue) => ({
        ...prevValue,
        [field]: true
      }));
    } else {
      setIsError((prevValue) => ({
        ...prevValue,
        [field]: false
      }));
    }
    return valid;
  };

  const handleQueryChange = (event) => {
    setShowLoadMore(false);
    setQuery(event.target.value);
  };

  const handleFromChange = (event) => {
    setShowLoadMore(false);
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setShowLoadMore(false);
    setTo(event.target.value);
  };

  const handleView = async () => {
    setIsLoading(true);
    const getCollectionsResponse = await CollectionService.getCollections(query, from, to);
    setIsLoading(false);
    setFilterUsed(true);
    if (getCollectionsResponse) {
      setShowLoadMore(true);
      setCallsNum(1);
      setCollections(getCollectionsResponse);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    const getCollectionsResponse = await CollectionService.getCollections(
      filterUsed ? query : '',
      filterUsed ? from : '',
      filterUsed ? to : '',
      callsNum
    );
    setIsLoading(false);
    if (getCollectionsResponse) {
      if (!getCollectionsResponse.length) {
        setShowLoadMore(false);
      }
      setCallsNum((prev) => prev + 1);
      setCollections((prev) => [...prev, ...getCollectionsResponse]);
    }
  };

  const handleEdit = (i) => {
    if (!editSelected && !deleteSelected) {
      setDeleteSelected(null);
      setEditSelected(i);
      setCollectionToEdit(collections[i]);
    }
  };

  const handleDelete = (i) => {
    if (!editSelected && !deleteSelected) {
      setEditSelected(null);
      setDeleteSelected(i);
      setCollectionToEdit(collections[i]);
    }
  };

  const saveDelete = async () => {
    setIsLoading(true);
    const deleteResponse = await CollectionService.deleteCollection(collectionToEdit.id);
    setIsLoading(false);
    if (deleteResponse) {
      setDeleteSelected(null);
      setEditSelected(null);
      setCollectionToEdit({});
      setShowLoadMore(false);
      setCollections((prev) => {
        prev.splice(deleteSelected, 1);
        return prev;
      });
    }
  };

  const saveEdit = async () => {
    if (!isError.firm && !isError.location && !isError.anexaNum && !isError.quantity && !isError.date) {
      setIsLoading(true);
      const updateResponse = await CollectionService.updateCollection(collectionToEdit);
      setIsLoading(false);
      if (updateResponse) {
        setDeleteSelected(null);
        setEditSelected(null);
        setCollectionToEdit({});
        setCollections((prev) => {
          const newValues = [...prev];
          newValues[editSelected] = { ...updateResponse };
          return newValues;
        });
      }
    }
  };

  const closeEditDelete = () => {
    setDeleteSelected(null);
    setEditSelected(null);
    setCollectionToEdit({});
  };

  const handleEditInput = (event, field) => {
    setCollectionToEdit((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const renderRow = (collection, i) => {
    if (editSelected === i) {
      return (
        <TableRow className="edit-mode" key={`${collection.location}${collection.createdDate}`}>
          <TableCell align="center" scope="row">
            {i + 1}
          </TableCell>
          <TableCell align="right">
            <TextField
              className="input"
              type="text"
              value={collectionToEdit.firm}
              onChange={(event) => handleEditInput(event, 'firm')}
              onBlur={() => validateInput(collectionToEdit.firm, 'firm')}
              error={isError.firm}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              className="input"
              type="text"
              value={collectionToEdit.location}
              onChange={(event) => handleEditInput(event, 'location')}
              onBlur={() => validateInput(collectionToEdit.location, 'location')}
              error={isError.location}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              className="input"
              type="text"
              value={collectionToEdit.anexaNum}
              onChange={(event) => handleEditInput(event, 'anexaNum')}
              onBlur={() => validateInput(collectionToEdit.anexaNum, 'anexaNum')}
              error={isError.anexaNum}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              className="input"
              type="number"
              value={collectionToEdit.quantity}
              onChange={(event) => handleEditInput(event, 'quantity')}
              onBlur={() => validateInput(collectionToEdit.quantity, 'quantity')}
              error={isError.quantity}
            />
          </TableCell>
          <TableCell align="right">{collection.person}</TableCell>
          <TableCell align="right">
            <TextField
              className="date input"
              type="date"
              value={collectionToEdit.date.split('T')[0]}
              onChange={(event) => handleEditInput(event, 'date')}
              onBlur={() => validateInput(collectionToEdit.date, 'date')}
              error={isError.date}
            />
          </TableCell>
          <TableCell align="center">
            <MdCheck size={20} onClick={saveEdit} />
            <MdClose size={20} onClick={closeEditDelete} />
          </TableCell>
        </TableRow>
      );
    }
    return (
      <TableRow
        className={`${i === editSelected ? 'edit-mode' : ''} ${i === deleteSelected ? 'delete-mode' : ''}`}
        key={`${collection.location}${collection.createdDate}`}
      >
        <TableCell align="center" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="right">{collection.firm}</TableCell>
        <TableCell align="right">{collection.location}</TableCell>
        <TableCell align="right">{collection.anexaNum}</TableCell>
        <TableCell align="right">{collection.quantity}</TableCell>
        <TableCell align="right">{collection.person}</TableCell>
        <TableCell align="right">
          <TextField className="date input" type="date" value={collection.date.split('T')[0]} />
        </TableCell>
        {deleteSelected !== i && (
          <TableCell align="center">
            <MdEdit size={20} onClick={() => handleEdit(i)} />
            <MdDelete size={20} onClick={() => handleDelete(i)} />
          </TableCell>
        )}
        {deleteSelected === i && (
          <TableCell align="center">
            <MdCheck size={20} onClick={saveDelete} />
            <MdClose size={20} onClick={closeEditDelete} />
          </TableCell>
        )}
      </TableRow>
    );
  };

  const handleExport = async () => {
    setIsLoading(true);
    const getCollectionsResponse = await CollectionService.exportCollection(query, from, to);
    setIsLoading(false);
    if (getCollectionsResponse) {
      setShowLoadMore(true);
      setDataToExport(getCollectionsResponse);
      csvLinkRef.current.link.click();
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-overview">
        <div className="title">Vizualizeaza toate colectarile</div>
        <div className="filters">
          <div className="inputs">
            <TextField
              className="date input filter"
              id="outline-date"
              label="Cauta"
              placeholder="Scrie aici..."
              type="text"
              onChange={handleQueryChange}
            />
            <TextField
              className="date input filter"
              id="outline-date"
              label="De la"
              type="date"
              value={from}
              onChange={handleFromChange}
            />
            <TextField
              className="date input filter"
              id="outline-date"
              label="Pana la"
              type="date"
              value={to}
              onChange={handleToChange}
            />
          </div>
          <div className="buttons">
            <Button className="view button filter" variant="contained" onClick={handleView}>
              Vizualizeaza
            </Button>
            <Button className="export button filter" variant="contained" onClick={handleExport}>
              Exporta
            </Button>
            <CSVLink
              className="hidden"
              data={dataToExport}
              filename="tkm-oil-data-export"
              ref={csvLinkRef}
              headers={headers}
            />
          </div>
        </div>
        <TableContainer className="table-container" component={Paper}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Firma</TableCell>
                <TableCell align="right">Denumire&nbsp;Locatie</TableCell>
                <TableCell align="right">Numar&nbsp;Anexa</TableCell>
                <TableCell align="right">Cantitate</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Data&nbsp;Colectare</TableCell>
                <TableCell align="right">Actiuni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {collections.map(renderRow)}
              {showLoadMore && (
                <TableRow className="load-more-row">
                  <TableCell className="help-cell" />
                  <TableCell className="help-cell" />
                  <TableCell className="help-cell" />
                  <TableCell className="help-cell" />
                  <TableCell className="load-more-cell" onClick={handleLoadMore}>
                    <MdRefresh size={22} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Overview;
