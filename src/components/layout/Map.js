import React, {useCallback, useState, useRef, useEffect, Fragment} from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox"
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import markerIcon from '../../assets/images/barbeiro.png'
const libraries = ['places']
 
const center = {
  lat: -12.6975,
  lng: -38.32417
};

// styles = snazzymaps.com
const options = {
  disableDefaultUI: true,
  zoomControl: true  
}

// styles
const containerStyle = {
  width: '100%',
  height: '400px'
};

const useStyles = makeStyles({
  searchInput: {
    color: "#281414",
    zIndex: 10,
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
    <Search panTo={panTo} />
    <Locate panTo={panTo} />

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
          <h2>Owner: {userSelected.userOwner}</h2>
          }
        </div>
      </InfoWindow>) : null}
    </GoogleMap>
    </div>

  )
}

function Locate({panTo}) {
  return (
    <button onClick={() => {
      navigator.geolocation.getCurrentPosition( position => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      () => null
      )}}
    >
      voltar
    </button>
  )
}
 
function Search({panTo}) {
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
    <ComboboxInput value={value} onChange={(e) => {
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

export default React.memo(MyComponent)