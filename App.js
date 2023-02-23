import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {


    const [quote, setQuote] = useState([]);
    const [newQuote, setNewQuote] = useState(false);
    const url = "https://api.breakingbadquotes.xyz/v1/quotes"
  
 
    const getRandomQuote = (url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setQuote(data[0]))
        .catch((err) => console.log(err))
    }

  
    useEffect(() => {

      getRandomQuote(url) 

      if (setNewQuote === true){

        setTimeout(() => {
          getRandomQuote(url) 
        }, 2000 ) 
      }
      
        setNewQuote(false)

    },[newQuote])
  

  return (
    <View style={styles.container}>
      <StatusBar  
      backgroundColor='#1f6032'
      barStyle="dark-content" />
      <Image  style={styles.img} source={require('./src/img/image.png')}/>

      {quote.length === 0 &&  <Text style={styles.textFrase}>Carregando...</Text>}

      {quote.length != 0 &&  
        <View style={styles.textContainer}>
           <Text style={styles.textFrase}>{quote.quote}</Text>
            <Text style={styles.textAuthor}>{quote.author}</Text>
        </View>
       
        
        }

      <Text style={styles.textFrase}></Text>
      <TouchableOpacity style={styles.button} onPress={() => setNewQuote(true)}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Random Quote</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3B3A3F'
  },
  img: {
    width: 200, 
    height: 200,
    marginBottom: 60,
    marginTop: 80,
  },
  textContainer: {
    width: '95%',
  },
  textFrase: {
    fontSize: 20,
    marginRight: 30,
    marginLeft: 30,
    color: '#EAB310',
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textAuthor:{
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'right',
    marginRight: 30,
    padding: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: '#0d3e10',
    borderRadius: 25,
    backgroundColor: '#1f6032',
    marginTop: 50,
  },
  buttonTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 18,
    fontWeight:'bold',
    color: '#fff'
  }

});
