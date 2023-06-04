const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

const accountSid = "ACc8fd830d9bd0dc863aebfec22811590e";
const authToken = "416ae74d3ebe0ccfac7f9dd4dea68ebc";
const client = require("twilio")(accountSid, authToken);

app.get('/realizar-llamada', (req, res) => {
  const { address, buttonType } = req.query;
  const phoneNumber = "+528662568592";
  const twilioNumber = "+13156442818";
  const direccion = decodeURIComponent(address.replace(/\+/g, ' '));

  let mensajeAyuda;
  switch (buttonType) {
    case 'ambulance':
      mensajeAyuda = '¡Necesito asistencia médica manden una ambulancia!!';
      break;
    case 'car':
      mensajeAyuda = '¡Necesito una patrulla porfavor!';
      break;
    case 'fire-extinguisher':
      mensajeAyuda = '¡Hay un incendio y necesito ayuda!';
      break;
    default:
      mensajeAyuda = '¡Necesito ayuda!';
      break;
  }

  const textToSay = `Hola, me llamo USUARIO. ${mensajeAyuda}. Estoy en: ${direccion} REPITO Estoy en: ${direccion} `;

  client.calls
    .create({
      url: "http://twimlets.com/message?Message%5B0%5D=" + encodeURIComponent(textToSay),
      to: phoneNumber,
      from: twilioNumber,
      speed: -2,
      language: "es-MX",
      voice: "Polly.Mia", // Selecciona la voz de Mia en español
    })
    .then(call => {
      console.log(call.sid);
      res.send('Llamada realizada');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error al realizar la llamada');
    });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});