import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'FAQ',
    headerStyle: {
      backgroundColor: '#1e8bc3',
    },
    headerTintColor: '#000000',
  };

  state = {user: ''}

  updateUser = (user) => {
    this.setState({ user })
  }

  _renderItem ({item, index}) {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{ item.title }</Text>
        </View>
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return ( 
        <ScrollView style = {styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style = {styles.header}>What is Autism Spectrum Disorder?</Text>
          <Text style = {styles.text}>Autism spectrum Disorder (ASD) is a developmental disorder that 
          affects communication and behavior. Although autism can be diagnosed at any age, it is known 
          as a <Text style = {{fontStyle: 'italic'}}>developmental disorder</Text> due to the fact 
          that symptoms typically present in the first two years. </Text>
          <Text style = {styles.header}>What is the Autism Spectrum?</Text>
          <Text style = {styles.text}>Autism is diagnosed on a spectrum. 
          This simply means that there are different degrees of difficulties in social interaction, 
          verbal and nonverbal communication and repetitive behavior.</Text>
          <Text style = {styles.header}>So how is ASD diagnosed?</Text>
          <Text style = {styles.text}>To diagnose ASD an individual must display at least six 
          symptoms. These symptoms include at least two symptoms of impairment in social interaction, 
          one symptom in communication and one symptom of restricted and repetitive behavior.</Text>
          <Text style = {styles.header}>What are symptoms of ASD?</Text>
          <Text style = {styles.listHeader}>Social Interaction/Communication Behavior</Text>
          <Text style = {styles.text}>• Little or inconsistent eye contact</Text>
          <Text style = {styles.text}>• Tending not to look at or listen to people</Text>
          <Text style = {styles.text}>• Rarely sharing enjoyment of objects or activities by pointing or showing things to others’</Text>
          <Text style = {styles.text}>• Having facial expressions, movements, and gestures that do not match what is being said.</Text>
          <Text style = {styles.listHeader}>Restricted/Repetitive Behavior </Text>
          <Text style = {styles.text}>• Repeating certain behaviors, words or phrases</Text>
          <Text style = {styles.text}>• Being upset by slight changes in routine</Text>
          <Text style = {styles.text}>• Being more or less sensitive than other people to sensory 
          input such as light, noise, clothing, or temperature</Text>
          <Text style = {styles.header}>What are some of my treatment options?</Text>
          <Text style = {styles.text}><Text style = {{fontWeight: 'bold'}}>SSRI: </Text>
          This is a medication that would increase the level of serotonin in the brain. Serotonin 
          is a chemical found in the brain that is involved in security, safety and self-confidence. 
          This is important because one of the signs that your child might have autism is depleted 
          levels of serotonin in the brain.</Text>
          <Text style = {styles.text}><Text style = {{fontWeight: 'bold'}}>Antipsychotic Drug: </Text>
          This class of medication would stereotypic behaviors, hyperactivity and attention problems 
          associated with ASD.</Text>
          <Text style = {styles.text}><Text style = {{fontWeight: 'bold'}}>Early intervention
           therapy: </Text>Behavioral therapy during the toddler or preschool years can significantly 
           improve cognitive and language skills in young children with ASD.</Text>
           <Button
            onPress = {() => this.props.navigation.navigate('ET')}
            title = 'Continue'
            style = {{ padding: 10}}/>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listHeader: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    padding: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});