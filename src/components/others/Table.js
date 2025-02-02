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
import Button from '@material-ui/core/Button'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  }
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
  buttonEdit: {
    fontSize: "0.8rem",
    backgroundColor: "#A77D2D",
    color: "#fff",
    marginRight: ".8rem",
    "&:hover": {
      backgroundColor: "#664608"
    }
  },
  buttonDelete: {
    fontSize: "0.8rem"
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  const {places, handle, setOpenModal, setLocation, setId, setCategory} = props

  const handleOpenModal = (place) => {
    setLocation(place)
    setCategory(place.category)
    setId(place.placeId)
    setOpenModal(true)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>

            <StyledTableCell>Localização</StyledTableCell>
            <StyledTableCell align="right">Categoria</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {places && places.map((place) => (
              place.handle === handle &&
            <StyledTableRow key={place.placeId}>

              <StyledTableCell>{place.description}</StyledTableCell>
              <StyledTableCell align="right">{place.category}</StyledTableCell>
              <StyledTableCell align="right">
                <div>
                      <Button 
                      className={classes.buttonEdit}
                      variant="contained" 
                      onClick={() => handleOpenModal(place)}
                      >
                        Editar
                      </Button>
                  </div>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
