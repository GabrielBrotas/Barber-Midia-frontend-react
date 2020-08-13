import React from 'react';

// MUI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  const {places, handle, setOpenModal, setLocation, setTitle, setId} = props

  const handleOpenModal = (place) => {
    setTitle(place.title)
    setLocation(place)
    setId(place.placeId)
    setOpenModal(true)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome do estabelecimento</StyledTableCell>
            <StyledTableCell align="right">Localização</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {places && places.map((place) => (
              place.handle === handle &&
            <StyledTableRow key={place.placeId}>
              <StyledTableCell component="th" scope="row">
                {place.title}
              </StyledTableCell>
              <StyledTableCell align="right">{place.description}</StyledTableCell>
              <StyledTableCell align="right">
                  <button onClick={() => handleOpenModal(place)}>
                      editar
                  </button>
                  <button>
                      excluir
                  </button>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
