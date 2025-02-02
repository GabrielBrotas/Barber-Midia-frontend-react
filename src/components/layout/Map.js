import React, {useCallback, useState, useRef, useEffect, Fragment} from 'react'
import {Combobox,  ComboboxPopover, ComboboxOption, ComboboxInput} from "@reach/combobox"
import theme from '../../utils/theme'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllPlaces} from '../../redux/actions/dataActions'
// Map
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import mapStyle from '../../utils/MapStyle'

// MUI
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import homemIcon from '../../assets/images/homem.png'
import mulherIcon from '../../assets/images/mulher.png'
import filterIcon from '../../assets/images/filtro.png'

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
  comboboxContent: {
    marginLeft: 'auto'
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
  },
  genderFilter: {
    display: 'flex',
    marginLeft: 'auto'
  },
  filterIcon: {
    cursor: "pointer",
    margin: "0 1rem"
  }

});

function MyComponent(props) {
  const classes = useStyles();

  const dataList = useSelector(state => state.data)
  const {places} = dataList

  const {setUserSelected, userSelected} = props
  const [selected, setSelected] = useState(null)
  
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

      <div className={classes.genderFilter}>
      <FilterMan />
      <FilterWoman />
      <CleanFilter />
      </div>
      
    </div>
    
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{styles: mapStyle, disableDefaultUI: true}}
      onLoad={onMapLoad}
    >

      {places.map( marker => (
        marker.confirmed === true &&
        <Marker 
          key={marker.placeId}
          position={{ lat: marker.lat, lng: marker.lng}} 
          icon={{
            url: marker.category === "Cabelo Masculino" ? (homemIcon) : (mulherIcon),
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
      radius: 15 * 1000,
      types: ['address']
  }})

  return (
  <Combobox 
  className={classes.comboboxContent}
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

  const restorePosition = () => {
    navigator.geolocation.getCurrentPosition( position => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, () => null)
  }
  return (
    <div className={classes.goBack}>
      <RestoreIcon onClick={restorePosition} />
    </div>
  )
}

function FilterMan() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const justShowManMarker = () => {
    dispatch(getAllPlaces("Cabelo Masculino"))
  }

  return (
    <div className={classes.filterIcon} onClick={justShowManMarker}>
      <Tooltip placement="top" title="Apenas Masculino">
        <img src={homemIcon} alt="filter man" style={{width: 35}}/>
      </Tooltip>
    </div>
  )
}

function FilterWoman() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const justShowWomanMarker = () => {
    dispatch(getAllPlaces("Cabelo Feminino"))
  }

  return (
    <div className={classes.filterIcon} onClick={justShowWomanMarker}>
      <Tooltip placement="top" title="Apenas Feminino">
        <img src={mulherIcon} alt="filter woman"/>
      </Tooltip>
    </div>
  )

}

function CleanFilter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const justShowWomanMarker = () => {
    dispatch(getAllPlaces())
  }

  return (
    <div className={classes.filterIcon} onClick={justShowWomanMarker}>
      <Tooltip placement="top" title="Limpar Filtro">
        <img src={filterIcon} alt="no filter" style={{width: 35}} />
      </Tooltip>
    </div>
  )
}



export default React.memo(MyComponent)