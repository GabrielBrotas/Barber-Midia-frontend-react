import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '1rem',
    marginBottom: '2rem',
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value='Usuario'>Usuario</MenuItem>
          <MenuItem value='Barber Shop'>Barber Shop</MenuItem>
          <MenuItem value='Salao'>Salao</MenuItem>
          <MenuItem value="Barbearia">Barbearia</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

SimpleSelect.protoTypes = {
  classes: PropTypes.object.isRequired, // styles
}


export default SimpleSelect
