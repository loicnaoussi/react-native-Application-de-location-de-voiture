import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const centerOnUser = () => {
    if (location) {
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      Alert.alert('Erreur', 'Position actuelle non disponible');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 3.8480,
          longitude: 11.5021,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Votre position"
            description="Vous êtes ici"
          />
        )}
      </MapView>
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Position actuelle : {location ? `${location.latitude}, ${location.longitude}` : 'En attente...'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={centerOnUser}>
          <Text style={styles.buttonText}>Centrer sur le marqueur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoSection: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 43, 91, 0.9)', // Bleu foncé avec transparence
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700', // Or
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFD700', // Or
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#002B5B', // Bleu foncé
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
