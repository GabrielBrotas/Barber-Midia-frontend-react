import React from 'react';
import theme from '../../utils/theme';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const CssFormControl = withStyles({
  root: {
    '& label.Mui-focused': {
      color: theme.fontSecondaryColor,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.fontSecondaryColor,
      },
      '&.Mui-focused fieldset': {
        borderColor:  theme.mainColor,
      },
      '&:hover fieldset': {
          borderColor: theme.mainColor,
      },
    },
  },
})(FormControl);

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '1rem',
    marginBottom: '2rem',
    minWidth: 120,
    width: '100%',
    '& label': {
      color: theme.fontSecondaryColor,
      backgroundColor: theme.backgroundColorSecondary,
      borderRadius: "1rem",
      padding: "0.2rem 1.1rem"
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect(props) {
  const classes = useStyles();

  return (
    <div>
      <CssFormControl variant="outlined" name="category"className={classes.formControl}>
        <InputLabel name="category" id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          name="category"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.category}
          onChange={(e) => props.onChangeSelect(e.target.value)}
          label="Category"
          style={{color: props.fontColor, backgroundColor: props.backgroundColor}}
        >
          <MenuItem value='Usuario'>Usuario</MenuItem>
          <MenuItem value='Cabelo Masculino'>Cabelo Masculino</MenuItem>
          <MenuItem value='Cabelo Feminino'>Cabelo Feminino</MenuItem>
          <MenuItem value='Ambos'>Ambos</MenuItem>
          <MenuItem value='Tatuagem'>Tatuagem</MenuItem>
        </Select>
      </CssFormControl>
    </div>
  );
}

SimpleSelect.protoTypes = {
  classes: PropTypes.object.isRequired, // styles
}


export default SimpleSelect
