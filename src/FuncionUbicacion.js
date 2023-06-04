export default function ejecutar(){
  const ejecutarServidor = async () => {
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
          
          const url = `http://192.168.1.2:3000/realizar-llamada?address=${encodeURIComponent(address)}`;
  
  
  
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
  }
  
}
