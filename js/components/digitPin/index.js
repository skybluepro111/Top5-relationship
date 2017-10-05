import React, { Component } from "react";
import { Image, Animated, TextInput, AsyncStorage, Alert } from "react-native";
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

class DigitPin extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      pin: "",
      isLoading: false
    };

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


  verifyPin(){
    this.setState({isLoading: true});
    const words = this.props.user.phoneNumber.split('-');
    let url = 'https://api.authy.com/protected/json/phones/verification/check?api_key=biOpQNtqOdVBtz1vIWY5Vjt3s5WEsanD&phone_number='+ words[1] +'&country_code='+ words[0] +'&verification_code=' + this.state.pin

    fetch(url).then((response)=> {
        if(response.status == 200) return response.json();
        else{
          console.warn(response);
          this.setState({isLoading: false});
          Alert.alert('Error', "Incorrect pin")
          return;
        }
    })
    .then((response)=> {
        debugger;
        if(response !== undefined && response.success){
        console.debug(response);
        console.warn(response);
        this.setState({isLoading: false});
        this.verifyPhoneNumberDone();
        }
        
      
        
        // ...
    })
    .catch((error)=> {
      // console.warn(error);
        // console.error(error);
        this.setState({isLoading: false});

    });

  }

  verifyPhoneNumberStart(){
    if (/\S/.test(this.state.pin) == false) {
         Alert.alert( 'Error', 'Please enter 4 digit pin.')
    }
    else if (this.state.pin.length != 4) {
         Alert.alert( 'Error', 'Please enter valid 4 digit pin.')
    }
    else{
      this.verifyPin();

    }
  }

  verifyPhoneNumberDone(){
      console.warn(this.props.user.name)
      console.warn(this.props.user.phoneNumber)
      this.savePhoneNumber(this.props.user.phoneNumber)
      this.saveLoginState("true")
      Database.createUser(this.props.user.name, this.props.user.phoneNumber)
      this.props.navigation.navigate("ImportContacts")
  }

  

 //To save the Login State
  async saveLoginState (isLoggedIn){
    if (isLoggedIn !== undefined && isLoggedIn !== null){
      try {
        await AsyncStorage.setItem('@isLoggedIn:key', isLoggedIn );
      } catch (error) {
        console.warn(`error ${error}`);
      }

    }

  }



  //To save the phone number
  async savePhoneNumber (phoneNumber){
    if (phoneNumber !== undefined && phoneNumber !== null){
      try {
        await AsyncStorage.setItem('@phoneNumber:key', phoneNumber );
      } catch (error) {
        console.warn(`error ${error}`);
      }

    }

  }



  render() {
    return (
      <Container>
        <View style={styles.container}>
            <Content>
              <View style={styles.shadow}>



                 <View style={{marginTop: 50}}>


                  <Text style={styles.textStyle}>
                    Enter 4 digit pin number.
                  </Text>
                  
                  <View style={styles.inputOuterView}>
                  <TextInput style={styles.inputView}
                    placeholder="Enter 4 digit pin number."
                    onChangeText={(pin) => this.setState({pin})}
                    value={this.state.name}
                    maxLength={4}
                    keyboardType='numeric'
                  />
                  </View>
                </View>

                
                  <Button rounded bordered light
                    style={styles.btn}
                    onPress={() => this.verifyPhoneNumberStart()}
                  >
                    <Text>Done</Text>
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
    setUser: name => dispatch(setUser(name))
  };
}

const mapStateToProps = state => ({
  user: state.user.name
});

DigitPin.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(DigitPin);
