import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator,TouchableOpacity } from 'react-native';
import _ from 'lodash';

function Test({ navigation,route}) {
   let points = React.useRef(0)
   const { name,idParam } = route.params;
   const [isLoading, setLoading] = useState(true);
   const [value, setValue] = useState(0);
   const [data, setData] = useState(0);
   

   const getTest = async () => {
    try {
     const res = await fetch(`https://tgryl.pl/quiz/test/${idParam}`)
     const results = await res.json()
     setData(results);
     results.tasks = _.shuffle(results.tasks);
     
     for (let i = 0; i < results.tasks.length; i++) {
      results.tasks[i].answers = _.shuffle(results.tasks[i].answers);
      }


   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
  }
  
  useEffect(() => {
    getTest();
  }, []);


  const handleOnPress = (answerNumber) =>{

    if(value < (data.tasks.length-1)){
      if(data.tasks[value].answers[answerNumber].isCorrect){
        points.current++
      }
      setValue(value+1)
    }else{
      setValue(0)
      navigation.navigate('Score', { points: points.current, questionLength: data.tasks.length ,name:name, typ: data.name})
      points.current = 0
    }
  
  }

return(
  <View style={styles.container}>
    {isLoading ? <ActivityIndicator/> : (
      <View>
    <View style={styles.quest}>
      <Text style={styles.text}>{data.tasks[value].question}</Text>
    </View>

    <View style={styles.answers}>
        <View style={styles.column}>
          {data.tasks[value].answers.map((element, i) => {
            return <TouchableOpacity  key={i} style={styles.button} onPress={() => handleOnPress(i)}>
                        <Text style={styles.text_answer}>{data.tasks[value].answers[i].content}</Text>
                   </TouchableOpacity>
          })}
        </View>
    </View>
    </View>)}
  </View>)
};

const styles = StyleSheet.create({
  quest: {
      height: 200,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
  },
  text: {
      textAlign: 'center',
      fontSize: 30,
      color: 'black',
      fontFamily: 'ChivoMono-Italic-VariableFont_wght'
  },
  text_answer: {
      fontSize: 20,
      fontFamily: 'Caveat-VariableFont_wght',
      color: 'white',
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      paddingHorizontal: 30,
      margin: 5,
      backgroundColor: 'grey',

  },
});


export default Test
