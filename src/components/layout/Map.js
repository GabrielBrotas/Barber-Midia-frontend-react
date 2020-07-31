import React, {useCallback, useState, useRef, useEffect} from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import markerIcon from '../../assets/images/barbeiro.png'
const libraries = ['places']

const containerStyle = {
  width: '100%',
  height: '400px'
};
 
const center = {
  lat: -12.6975,
  lng: -38.32417
};

// styles = snazzymaps.com
const options = {
  disableDefaultUI: true,
  zoomControl: true  
}

function MyComponent(props) {
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  })
  const {places, loading, setUserSelected} = props
  const [selected, setSelected] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect( () => {
    !loading &&  (setMarkers(places))
  }, [places, selected, loading])

  // manter o estado sem ficar reenderizando
  const mapRef = useRef()
  const onMapLoad = useCallback( map => {
    mapRef.current = map
  }, [])

  if(loadError) return "error loading map"
  if(!isLoaded) return "loading maps"

  return (
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
          <h2>testing</h2>
        </div>
      </InfoWindow>) : null}
    </GoogleMap>

  )
}
 
export default React.memo(MyComponent)