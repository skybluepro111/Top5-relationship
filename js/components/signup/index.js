import React, { Component } from "react";
import { Image, Animated, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Form, Label
} from "native-base";
import { setUser } from "../../actions/user";
import styles from "./styles";
import Contacts from "react-native-contacts"
import Database from "../../database/";
import Loading from "../loading/"

class Signup extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phn: "",
      ext: "",
      contacts: [],
      isLoading: false,
      anim: new Animated.Value(0),
    };

  }

  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  }

  setUser(data) {
    this.props.setUser(data);
  }


  fetchContacts(){
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
        console.warn(err)
      } else {
        // contacts returned in []
        console.warn(contacts)
        this.setState({contacts: contacts});
      }
    })
  }

  saveAllContacts(){

    
    var contactDetails = {};
    this.state.contacts.map((contact)=>{
        contactDetails[contact.recordID] = contact
    });


    Database.setContacts("1234567890", contactDetails)
  }


  verifyPhoneNumber(){
    this.setState({isLoading: true})
  

    fetch('https://api.authy.com/protected/json/phones/verification/start', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: 'biOpQNtqOdVBtz1vIWY5Vjt3s5WEsanD',
        via: 'sms',
        country_code: this.state.ext,
        phone_number: this.state.phn
    })
  }).then((response)=> {
        if(response.status == 200) return response.json();
        else{
          console.warn(response);
          this.setState({isLoading: false})
          Alert.alert('Error', response.json())
        }
    })
    .then((response)=> {
        console.warn(response);
        
        this.messageSent();
        // ...
    })
    .catch((error)=> {
      console.warn(error);
      this.setState({isLoading: false})
        // console.error(error);
    });

  }

  verifyPhoneNumberCheck(){
    var isAllConditionMet = true;
    if (/\S/.test(this.state.name) == false) {
         Alert.alert( 'Error', 'Please enter your name.')
    }
    else if(/\S/.test(this.state.phn) == false){
      Alert.alert( 'Error', 'Please enter your phone number.')
    }
    else if(/\S/.test(this.state.ext) == false){
      Alert.alert( 'Error', 'Please enter your country extension.')
    }
    else{
      this.verifyPhoneNumber()
    }
  }

  messageSent(){
    this.setState({isLoading: false})
            var data = {name: this.state.name, phoneNumber: this.state.ext + "-" + this.state.phn}
        this.setUser(data);
        this.props.navigation.navigate("DigitPin")
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
            <Content>
              <View style={styles.shadow}>



                 <View style={{marginTop: 50}}>


                  <Text style={styles.textStyle}>
                    Name
                  </Text>
                  
                  <View style={styles.inputOuterView}>
                  <TextInput style={styles.inputView}
                    placeholder="Name"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                  />
                  </View>
                </View>

                  <View style={{marginTop: 20}}>

                    <Text style={styles.textStyle}>
                    Phone Number
                  </Text>


                  <View style={{flex: 1, flexDirection: 'row'}}>

                    <View style={{flex: 2}}>

                  <View style={styles.inputOuterView}>

                  <TextInput style={styles.inputView}
                    keyboardType='numeric'
                    maxLength={4}
                    placeholder="ext"
                    onChangeText={(ext) => this.setState({ext})}
                    value={this.state.text}
                  />
                  </View>
                  </View>

                  <View style={{flex: 5}}>
                  <View style={styles.inputOuterView1}>
                  <TextInput style={styles.inputView}
                    keyboardType='numeric'
                    maxLength={15}
                    placeholder="Phone Number"
                    onChangeText={(phn) => this.setState({phn})}
                    value={this.state.text}
                  />
                  </View>
                  </View>

                  </View>
                </View>
                  <Button rounded bordered light
                    style={styles.btn}
                    onPress={() => this.verifyPhoneNumberCheck()}
                  >
                    <Text>Verify</Text>
                  </Button>
              </View>
            </Content>
        </View>
        <Loading isLoading={this.state.isLoading}/>
      </Container>


      
    );
  }

}

function bindAction(dispatch) {
  return {
    setUser: data => dispatch(setUser(data))
  };
}

const mapStateToProps = state => ({
  user: state.user.name
});

Signup.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(Signup);

