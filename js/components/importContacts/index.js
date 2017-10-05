import React, { Component } from "react";
import { Image, Animated, TextInput, Alert, AsyncStorage } from "react-native";
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

class ImportContacts extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };

  }


  setUser(data) {
    this.props.setUser(data);
  }

  fetchContacts(){
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
        console.warn(err)
        Alert.alert('Alert', 'Please allow to access contacts from settings.')
        this.saveAccessToContactAllowed("false")
        
      } else {
        // contacts returned in []
        this.saveAccessToContactAllowed("true")
        console.warn(contacts)
        this.setState({contacts: contacts});
        this.saveAllContacts();
      }
    })
  }

   //To save the Contact Access Permission
  async saveAccessToContactAllowed (isAllowed){
    if (isAllowed !== undefined && isAllowed !== null){
      try {
        await AsyncStorage.setItem('@contactAccess:key', isAllowed );
      } catch (error) {
        console.warn(`error ${error}`);
      }
    }
  }

  saveAllContacts(){

    var user = this.props.user;
    user.contacts = this.state.contacts
    this.setUser(user)

    var contactDetails = {};
    this.state.contacts.map((contact)=>{
        contactDetails[contact.recordID] = contact
    });


    Database.setContacts(this.props.user.phoneNumber, contactDetails)
    this.props.navigation.navigate("Home")
  }




  render() {
    return (

              <View style={styles.shadow}>
                  <Button rounded bordered light style={styles.btn}
                    onPress={() => this.fetchContacts()}
                  >
                    <Text>Import Contacts</Text>
                  </Button>
              </View>


      
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

ImportContacts.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(ImportContacts);
