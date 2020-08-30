import React, {useCallback, useState, useRef, useEffect, Fragment} from 'react'
import {Combobox,  ComboboxPopover, ComboboxOption, ComboboxInput} from "@reach/combobox"
import theme from '../../utils/theme'
import homemIcon from '../../assets/images/homem.png'
import mulherIcon from '../../assets/images/mulher.png'

// Map
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import mapStyle from '../../utils/MapStyle'

// MUI
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';

const center = {
  lat: -12.6975,
  lng: -38.32417
};

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
    width: "15rem",
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
  },
  popOver: {
    backgroundColor: "#fff",
    marginTop: ".2rem",
    borderRadius: "1rem",
    width: "100%"
  },
  popOverOptions: {
    listStyle: "none",
    padding: ".8rem",
    borderBottom:" 1px solid #9e9e9e",
    cursor: "pointer",
    "&:hover": {
      color: "#b1832b",
      backgroundColor: "rgba(0,0,0,0.1)"
    },
  },
  userPictureContent: {
    height: 100,
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1rem'
  },
  userPicture: {
      color: theme.mainColor,
      width: "100%",
      height: "100%"
  }

});

function MyComponent(props) {
  const classes = useStyles();

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
    mapRef.current.setZoom(16)
  }, [])

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
      options={{styles: mapStyle, disableDefaultUI: true}}
      onLoad={onMapLoad}
    >
      {markers.map( marker => (
        <Marker 
          key={marker.placeId}
          position={{ lat: marker.lat, lng: marker.lng}} 
          icon={{
            url: marker.category === "Cabelo Masculino" && (homemIcon) || marker.category === "Cabelo Feminino" && (mulherIcon),
            scaledSize: new window.google.maps.Size(30,30),
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
        <div className={classes.infoWindow}>
          <InfoWindow 
          position={{lat: selected.lat, lng: selected.lng}}
          options={{styles: [{}]}}
          onCloseClick={() => {
            setSelected(null)
            setUserSelected(null)
          }}>
          <div>
            {userSelected &&
            <Fragment>
            <h2>{userSelected.title}</h2>
            <h4>location: {userSelected.description}</h4>
            </Fragment>
            }
          </div>
          </InfoWindow>
        </div>
      ) : null}
    </GoogleMap>
    </div>

  )
}
 
function Search({panTo}) {
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

  return (
  <Combobox 
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
    <ComboboxPopover className={classes.popOver}>
      {status === "OK" && 
        data.map(({id, description}) => (
          <ComboboxOption className={classes.popOverOptions} key={id} value={description} />
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