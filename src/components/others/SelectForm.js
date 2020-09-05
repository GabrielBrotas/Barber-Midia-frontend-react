import React from 'react';
import theme from '../../utils/theme';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
    marginBottom: '.5rem',
    minWidth: 120,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
    '& label': {
      color: theme.fontSecondaryColor,
      backgroundColor: theme.backgroundColorSecondary,
      borderRadius: ".2rem",
      padding: "0.3rem 1.8rem",
      left: "-0.5rem"
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect(props) {
  const classes = useStyles();
  const {onChangeSelect, value, options, title} = props
  return (

    <CssFormControl variant="outlined" name="category"className={classes.formControl}>
      <Select
        name="category"
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={(e) => onChangeSelect(e.target.value)}
        label="Category"
        displayEmpty
      >
        <MenuItem value="">
          <em>{title}</em>
        </MenuItem>

        {options.map( (option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}

      </Select>
    </CssFormControl>

  );
}

SimpleSelect.protoTypes = {
  classes: PropTypes.object.isRequired, // styles
}


export default SimpleSelect
