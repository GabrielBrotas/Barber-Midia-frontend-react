import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Typography from '@material-ui/core/Typography';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  typography: {
    padding: theme.spacing(2),
  }
}));

export default function CustomizedInputBase({panTo}) {
  const classes = useStyles();

  // 200m *1000 para transformar em km 
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => -12.6975,
      lng: () => -38.32417},
      radius: 200 * 1000
    }
  })
  return (
    <Paper component="form" className={classes.root}>
        <Combobox 
            className={classes.searchInput}
            onSelect={ async (address) => {
                setValue(address, false)
                clearSuggestions()

                try{
                const results = await getGeocode({address})
                const {lat, lng} = await getLatLng(results[0])
                panTo({lat, lng})
                } catch(err) {
                console.log("error!")
                }
            }}
        >
        <InputBase
            className={classes.input}
            inputProps={{ 'aria-label': 'search google maps' }}
            value={value} onChange={(e) => {
            setValue(e.target.value)
            }} 
            disabled={!ready}
            placeholder="Entry Address"
            
        />

        <Popover 
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        open={status === "OK" ? true : false}
        >
            {data.map(({id, description}) => (
            <Typography className={classes.typography} key={id}>{description}</Typography>
            ))}
        </Popover>
    </Combobox>

      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>

      <Divider className={classes.divider} orientation="vertical" />

      <IconButton 
      color="primary" 
      className={classes.iconButton} 
      aria-label="directions" 
      onClick={() => {
        navigator.geolocation.getCurrentPosition( position => {
            panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
            })
        },
        () => null
      )}}>
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
