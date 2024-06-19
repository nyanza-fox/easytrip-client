'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { calculateMidpointLat, calculateMidpointLong } from '@/utils/map';

interface MapsProps {
  coordinates: number[];
}

const Maps: React.FC<MapsProps> = ({ coordinates }) => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['geometry', 'places', 'routes', 'geocoding', 'drawing'],
  });

  useEffect(() => {
    // Mendapatkan lokasi pengguna saat komponen dimuat
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && userLocation && coordinates) {
      console.log(userLocation);
      if (!directionsServiceRef.current) {
        directionsServiceRef.current = new google.maps.DirectionsService();
      }
      directionsServiceRef.current.route(
        {
          origin: userLocation,
          destination: {
            lat: coordinates[0],
            lng: coordinates[1],
          },
          provideRouteAlternatives: true,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
            console.log('Tidak ada rute yang ditemukan.');
            setDirections(null);
          } else {
            console.log('Permintaan arah gagal karena ' + status);
            setDirections(null);
          }
        }
      );
    }
  }, [isLoaded, userLocation, coordinates]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    if (directionsServiceRef.current) {
      directionsServiceRef.current = null;
    }
    setDirections(null);
  };

  if (loadError) {
    return <div>Terjadi kesalahan saat memuat API Google Maps</div>;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={{
            lat: userLocation
              ? calculateMidpointLat(
                  Number(userLocation?.lat),
                  Number(userLocation?.lng),
                  coordinates[0],
                  coordinates[1]
                )
              : 0,
            lng: userLocation
              ? calculateMidpointLong(
                  Number(userLocation?.lat),
                  Number(userLocation?.lng),
                  coordinates[0],
                  coordinates[1]
                )
              : 0,
          }}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                fillColor: '#DB4437',
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 8,
              }}
            ></Marker>
          )}
          {coordinates && <Marker position={{ lat: coordinates[0], lng: coordinates[1] }} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
