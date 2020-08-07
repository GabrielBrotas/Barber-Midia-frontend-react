import React, {useCallback, useState, useRef, useEffect, Fragment} from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import {Combobox,  ComboboxPopover, ComboboxOption, ComboboxInput} from "@reach/combobox"
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import useOnclickOutside from "react-cool-onclickoutside";
import markerIcon from '../../assets/images/barbeiro.png'
import RestoreIcon from '@material-ui/icons/Restore';

// configs
const libraries = ['places']

const center = {
  lat: -12.6975,
  lng: -38.32417
};

// styles = snazzymaps.com
// todo, map styles
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

// styles
const containerStyle = {
  width: '100%',
  height: '400px'
};

const useStyles = makeStyles({
  comboboxInput: {
    border: 0,
    borderBottom:" 2px solid #9e9e9e",
    outline: "none",
    transition: ".2s ease-in-out",
    boxSizing: "border-box",
    height: "2rem",
    marginBottom: ".3rem",
    borderRadius: ".5rem",
    padding: "1rem",
    "&:focus": {
      borderBottom: '2px solid #A77D2D'
    }
  },
  goBack: {
    color: "#A77D2D",
    alignSelf: "center",
    cursor: "pointer",
    marginBottom: ".3rem",
    marginLeft: ".5rem",
    padding: ".1rem",
    verticalAlign: "top",
    borderRadius: "50%",
    "&:hover": {
      color: "#b1832b",
      backgroundColor: "rgba(0,0,0,0.1)"
    },
    "& .MuiSvgIcon-root": {
      width: "2rem",
      height: "2rem"
    }
  },
  mapActions: {
    display: "flex",
    justifyContent: "center"
  }
});

function MyComponent(props) {
  const classes = useStyles();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  })
  
  const {places, loading, setUserSelected, userSelected} = props
  const [selected, setSelected] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect( () => {
    !loading &&  (setMarkers(places))
  }, [places, selected, loading])

  const mapRef = useRef()
  const onMapLoad = useCallback( map => {
    mapRef.current = map
  }, [])

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(14)
  }, [])

  if(loadError) return "error loading map"
  if(!isLoaded) return "loading maps"

  return (
    <div className={classes.mapContent}>

    <div className={classes.mapActions}>
      <Search setUserSelected={setUserSelected} setSelected={setSelected} panTo={panTo} />
      <Locate panTo={panTo} />
    </div>
    
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={options}
      onLoad={onMapLoad}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      {markers.map( marker => (
        
        <Marker 
          key={marker.createdAt}
          position={{ lat: marker.lat, lng: marker.lng}} 
          icon={{
            url: markerIcon,
            // tamanho do icone
            scaledSize: new window.google.maps.Size(20,20),
            // onde vai ficar, nesse caso no centro do clique ou lat
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(0,0)
          }}
          onClick={() => {
            setSelected(marker)
            setUserSelected(marker)
          }}
        />
      ))}

      {selected ? (
      <InfoWindow 
      position={{lat: selected.lat, lng: selected.lng}}
      onCloseClick={() => {
        setSelected(null)
        setUserSelected(null)
      }}>
        <div>
          {userSelected &&
          <Fragment>
          <h2>Owner: {userSelected.handle}</h2>
          <h4>location: {userSelected.description}</h4>
          </Fragment>
          
          }
        </div>
      </InfoWindow>) : null}
    </GoogleMap>
    </div>

  )
}
 
function Search({panTo, setUserSelected, setSelected}) {
  const classes = useStyles();
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    });
  }, [])

  // 200m *1000 para transformar em km 
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      location: new window.google.maps.LatLng(lat, lng),
      radius: 200 * 1000,
      types: ['address']
  }})

  const ref = useOnclickOutside(() => {
    setSelected(null)
    setUserSelected(null)
  });

  return (
  <Combobox 
  ref={ref}
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
    <ComboboxInput className={classes.comboboxInput} value={value} onChange={(e) => {
      setValue(e.target.value)
    }} 
    disabled={!ready}
    placeholder="Entry Address"
    />
    <ComboboxPopover>
      {status === "OK" && 
        data.map(({id, description}) => (
          <ComboboxOption key={id} value={description} />
        ))}
    </ComboboxPopover>
  </Combobox>
  )
}

function Locate({panTo}) {
  const classes = useStyles();
  return (
    <div className={classes.goBack}>
      <RestoreIcon onClick={() => {
        navigator.geolocation.getCurrentPosition( position => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => null
        )}}
    
      />
    </div>
  )
}




export default React.memo(MyComponent)