import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Configuration, OpenAIApi } from 'openai';
import 'react-native-url-polyfill/auto';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const ChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  const handleInput = async () => {
    try {
      const userInput = input;
  
      // Introduce un retraso de 1 segundo entre las solicitudes
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: conversation.map((msg) => `You: ${msg.user}\nAI: ${msg.bot}\n`).join('') + `You: ${userInput}\nAI:`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      setOutput(response.data.choices[0].text);
      setConversation([...conversation, { user: input, bot: response.data.choices[0].text }]);
      setShowOutput(true);
    } catch (error) {
      console.log(error);
    }
  
    setInput('');
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // Agrega un hitSlop para expandir el área de pulsación
      >
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>


      <Text style={styles.title}>AI Chatbot</Text>

      <ScrollView style={styles.chatScrollView}>
        {conversation.map((msg, i) => (
          <View style={styles.messageContainer} key={i}>
            <Text style={styles.userMessage}>{`You: ${msg.user}`}</Text>
            <Text style={styles.botMessage}>{`AI: ${msg.bot}`}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe aqui tu mensaje"
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    marginVertical: 25,
    
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 40,
  },
  chatScrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  userMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  botMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;