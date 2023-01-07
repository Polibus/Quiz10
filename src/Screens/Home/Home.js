import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,Button,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native';
import _ from 'lodash';

function Home({navigation,route}) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {name,qList} = route.params;

  console.log(qList)


  const getQuiz = async () => {
    try {
     const res = await (await fetch('https://tgryl.pl/quiz/tests')).json();
     setData(res);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }


 useEffect(() => {
  getQuiz();
}, []);


return (
  <View style={styles.container}>
    {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={qList}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
          <TouchableOpacity style={styles.barContainer} onPress={()=>navigation.navigate('Test',{name: name,idParam: item.id})}>  
            <Text style={styles.title} >{item.name}</Text>
            <Text style={styles.tag} >{item.tags[0]}, {item.tags[1]}, {item.tags[2]}</Text>
            <Text style={styles.text} >{item.description}</Text>
          </TouchableOpacity> 
          )}
        />
    )}
      <View style={styles.footer} >
                <Button style={styles.footerButton} onPress={()=>navigation.navigate('Result')} title="Check!" />
      </View>
    </View>
  
  
);

};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 20,
        margin: 10,
      },
    barContainer: {
            flex: 0.3,
            borderWidth: 2,
            height: 100,
            margin: 10,
          },
    footer: {
       flex: 2,
       margin: 2,
  
    },
    footerTitle: {
      padding: 10,
       textAlign: 'center',
       flex: 1,
       fontFamily: 'ChivoMono-Italic-VariableFont_wght',
       color: 'black',
       fontSize: 15,
    },
  
    footerButton: {
         flex: 1,
      },
  
      title: {
        flex: 0.3,
        color: 'black',
        fontSize: 14,
        textAlign:'center',
        fontFamily: 'ChivoMono-Italic-VariableFont_wght'
      },
      tag: {
        flex: 0.2,
        color: '#69d5ff',
        fontSize: 15,
        fontFamily: 'Caveat-VariableFont_wght'
      },
      text: {
        flex: 0.5,
        color: 'black',
        fontSize: 12,
        fontFamily: 'ChivoMono-Italic-VariableFont_wght'
      },
    });

export default Home;