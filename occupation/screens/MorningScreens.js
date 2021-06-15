import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Image,
    TouchableOpacity,
} from 'react-native';

export default function BrushTeethScreen( { navigation }) {
  return (
    <View style={styles.morningView}>
      <Text style={styles.activityTxt}>Activity chosen:</Text>
      <Text style={styles.morningDescriptionTxt}>Your breath smells a little less smelly.</Text>
      <Image style={styles.activityImage} source={require('../assets/images/toothbrush.png')} />
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.morningOptionsTxt}>
            Go Back
        </Text>          
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activityTxt: {
    fontSize: 20,
    color: 'black'
  },

  morningView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fac457',
  },

  goBackButton: {
    backgroundColor: '#fa8e33',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },

  morningDescriptionTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    backgroundColor: 'yellow',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },

  activityImage:{
    width: 200,
    height: 200,
    margin: 10,
  }
});