import React from 'react';
import { APIProvider, Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';
import styles from './Map.module.css';
import mapUnavailableIcon from './map-unavailable-icon.png'

const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

interface Props {
  location: {
    lat?: string;
    lng?: string;
  };
}

const Map = ({ location: { lat, lng } }: Props) => {
  if (googleApiKey && lat && lng) {
    return (
      <APIProvider apiKey={googleApiKey}>
        <GoogleMap
          zoom={17}
          center={{lat: Number(lat), lng: Number(lng)}}
          gestureHandling={'cooperative'}
          disableDefaultUI={true}
        >
          <Marker position={{lat: Number(lat), lng: Number(lng)}}/>
        </GoogleMap>
      </APIProvider>
    )
  } else {
    return (
      <div className={styles.mapUnavailable}>
        <img alt="Map or location unavailable" src={mapUnavailableIcon} />
        {!googleApiKey ? (
          <p>Map API key is not available ☹️</p>
        ) : (
          <p>Location is not available ☹️</p>
        )}
      </div>
    )
  }
}

export default Map;