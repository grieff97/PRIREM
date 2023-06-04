import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Location from 'expo-location';
import sendLocationMessage from '../src/FuncionWap';
import sendLocationMessagep from '../src/FuncionWap1';
import sendLocationMessageb from '../src/FuncionWap2';
import sendLocationMessaged from '../src/FuncionWap3';
import React, { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {
  const ejecutarServidor = async (buttonType) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de geolocalización denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCXZuvUmnor0OvyqD4MmuZG3LSVEoaiIoU`;

      axios
        .get(geocodingUrl)
        .then(response => {
          const address = response.data.results[0].formatted_address;
          console.log('Ubicación aproximada:', address);
          
          const url = `http://10.235.242.100/realizar-llamada?address=${encodeURIComponent(address)}&buttonType=${buttonType}`;

          axios.get(url)
            .then(response => {
              console.log('Respuesta del servidor:', response.data);
            })
            .catch(error => {
              console.log('Error en la solicitud al servidor:', error.message);
            });
          // Realizar otras acciones con la ubicación aproximada...
        })
        .catch(error => {
          console.log('Error en la solicitud de geocodificación:', error.message);
        });
    } catch (error) {
      console.log('Error al obtener la ubicación:', error.message);
    }
  };

  const handleLogin = () => {
    // Lógica de inicio de sesión exitoso aquí
    navigation.navigate('Chat', { screen: 'chat' });
  };

  function Presionar() {
    sendLocationMessage();
  }

  function Presionar1() {
    sendLocationMessagep();
  }
  function Presionar2() {
    sendLocationMessageb();
  }
  function Presionar3() {
    sendLocationMessaged();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.button} onPress={() => ejecutarServidor('ambulance')}>
          <Icon name="ambulance" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ejecutarServidor('car')}>
          <Icon name="car" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ejecutarServidor('fire-extinguisher')}>
          <Icon name="fire-extinguisher" size={50} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.sosButton} onPress={ejecutarServidor}>
        <Icon name="exclamation-triangle" size={50} color="#fff" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.robotButton} onPress={() => handleLogin(navigation)}>
        <Icon name="wechat" size={50} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.whatsappButton} onPress={Presionar}>
        <Icon name="whatsapp" size={50} color="#fff" />
      </TouchableOpacity>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.botButtons} onPress={Presionar1}>
          <Icon name="battery-1" size={50} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botButtons} onPress={Presionar2}>
          <Icon name="heart" size={50} color="#fff" />
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.botButtons} onPress={Presionar3}>
          <Icon name="map-marker" size={50} color="#fff" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'bold',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff800f',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ff3b30',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  robotButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  sosText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  whatsappButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botButtons: {
    backgroundColor: '#808000',
    marginHorizontal: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
};