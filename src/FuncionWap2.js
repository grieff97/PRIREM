import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import * as Location from 'expo-location';

const sendLocationMessageb = async () => {
  const fixedNumber = '8131193383'; // Número de teléfono fijo

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  if (location) {
    const { latitude, longitude } = location.coords;
    const url = `http://api.whatsapp.com/send?phone=${fixedNumber}&text=me encuentro bien: https://maps.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  }
};

export default sendLocationMessageb;