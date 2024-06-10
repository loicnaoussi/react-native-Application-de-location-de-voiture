import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const SavedScreen = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');
  const [motorPower, setMotorPower] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [traction, setTraction] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    if (!make || !model || !type || !transmission || !pricePerDay || !description || !motorPower || !fuelType || !engineCapacity || !traction || images.length === 0) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('type', type);
    formData.append('transmission', transmission);
    formData.append('price_per_day', pricePerDay);
    formData.append('description', description);
    formData.append('motor_power_hp', motorPower);
    formData.append('fuel_type', fuelType);
    formData.append('engine_capacity_cc', engineCapacity);
    formData.append('traction', traction);

    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image_${index}.jpg`
      });
    });

    try {
      const response = await axios.post('http://localhost:5000/api/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Succès', 'Véhicule ajouté avec succès');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du véhicule');
    }
  };
  const logo = require('/home/fores06/Documents/Projets Actuels/Formation expo/react-native-rent-a-car/assets/splash.png');


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Mettre en location votre véhicule</Text>

      <TextInput
        style={styles.input}
        placeholder="Marque"
        value={make}
        onChangeText={setMake}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Modèle"
        value={model}
        onChangeText={setModel}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Type (SUV, Berline, etc.)"
        value={type}
        onChangeText={setType}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Transmission (Automatique, Manuelle)"
        value={transmission}
        onChangeText={setTransmission}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Prix par jour"
        keyboardType="numeric"
        value={pricePerDay}
        onChangeText={setPricePerDay}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Puissance moteur (cv)"
        keyboardType="numeric"
        value={motorPower}
        onChangeText={setMotorPower}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Type de carburant (Essence, Diesel)"
        value={fuelType}
        onChangeText={setFuelType}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Cylindrée moteur (cc)"
        keyboardType="numeric"
        value={engineCapacity}
        onChangeText={setEngineCapacity}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Traction (4x2, 4x4, etc.)"
        value={traction}
        onChangeText={setTraction}
        required
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Télécharger des images</Text>
      </TouchableOpacity>

      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e7e7e7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 100,  // Ajout de padding en bas pour éviter que le bouton soit caché
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
