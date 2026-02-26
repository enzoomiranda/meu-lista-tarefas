import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.myText1}>Login Top</Text>
        <TextInput style={styles.myTextInput} placeholder="Digite seu nome de usuário"/>
        <Pressable>
          <Text style={styles.myText1}>Entrar</Text>
        </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#990000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myText1: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20
  },
  myTextInput: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 10,
    width: '25%',
    textAlign: 'center',
  }
});
