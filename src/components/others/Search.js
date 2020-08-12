import React, {useState, useEffect} from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

// MUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles'
import theme from '../../utils/theme'
import CssTextField from './CssTextField'

const styles = {
    listForm:{
        backgroundColor: "#fff",
        color: theme.backgroundColorSecondary,
        borderRadius: "1rem"
    }
}

const Search = (props) => {

    const {classes, setLocation, oldLocation} = props
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        });
    }, [])

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: new window.google.maps.LatLng(lat, lng),
            radius: 2000,
            types: ['address']
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
        if(oldLocation) {
            
        }
    };

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
            setLocation({description, lat, lng})
        })
        .catch((error) => {
            console.log("😱 Error: ", error);
        });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
        const {
            id,
            structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
            <ListItem key={id} onClick={handleSelect(suggestion)} button>
                <ListItemText key={id} primary={main_text} secondary={secondary_text} />
            </ListItem>
        );
        });

    return (

        <div ref={ref}>
        <CssTextField
            value={value || oldLocation.description}
            onChange={handleInput}
            disabled={!ready}
            variant="filled"
            margin="normal"
            fullWidth
            id="location"
            label="Location *"
            placeholder="Localização do seu estabelecimento"
            name="location"
            autoComplete="location"
             
            // helperText={errors.handle} error={errors.handle ? true : false}
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <List className={classes.listForm}>{renderSuggestions()}</List>}

        </div>
        

    );
};

export default withStyles(styles)(Search)