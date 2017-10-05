import React, { Component } from "react";
import { Image, Animated, AsyncStorage, View } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";

import styles from "./styles";
import Login from "../login/"
import { setUser } from "../../actions/user";
import Contacts from "react-native-contacts"
import Loading from "../loading/"
import Database from "../../database/";

class InitialView extends Component {
  static navigationOptions = {
    header: null
  };


constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: "false",
      userPhoneNumber: '',
      isLoading: false,
      isContactFetched: "false",
      contacts: []
    };
    this.getPhoneNumber();
    this.getContactAccessPermission();
    this.getLoginState();


    setTimeout(() => {
      var userData = this.props.user
      if(userData == ""){
                    userData = {}
                }
        userData.phoneNumber = this.state.userPhoneNumber;
        this.setUser(userData);
      this.moveToNextScreen();
    }, 1000);


  }

    setUser(data) {
    this.props.setUser(data);
  }

  moveToNextScreen(){
    console.warn(this.state.isUserLoggedIn)
    if(this.state.isUserLoggedIn == "true"){
        if(this.state.isContactFetched == "true"){
            this.setState({isLoading: true})
            this.fetchContacts()
        }
        else{
          this.props.navigation.navigate("ImportContacts")
        }
    }
    else{
      this.props.navigation.navigate("Login")
    }
  }

  fetchContacts(){
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
        console.warn(err)
        Alert.alert('Alert', 'Please allow to access contacts from settings.')
        
      } else {
        // contacts returned in []
        console.warn(contacts)
        this.setState({contacts: contacts});
        this.saveAllContacts();
      }
    })
  }

    saveAllContacts(){
    var user = this.props.user;
    user.contacts = this.state.contacts
    this.setUser(user)

    var contactDetails = {};
    this.state.contacts.map((contact)=>{
        contactDetails[contact.recordID] = contact
    });


    this.getFavouriteContactList();
    
  }

  getFavouriteContactList(){
    this.listenFavouriteArray = Database.getFavoritesContact(this.state.userPhoneNumber, (userDataVal) => {
                console.warn(userDataVal);
                var user = this.props.user;
                if(user == ""){
                    user = {}
                }
                user.favList = userDataVal.favList
                user.name = userDataVal.name
                let userContacts = userDataVal.contactList;
               user.contacts = userContacts

               this.setState({isLoading: false})
                this.setUser(user)
                this.props.navigation.navigate("Home")
            });
  }



 async getLoginState() {

    try {
      const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn:key');
      if (isLoggedIn !== null) {
        this.setState({ isUserLoggedIn: isLoggedIn })
        return isLoggedIn;
      }
      return "";
    }
    catch (error) {
      console.warn(error);
      return "";
    }
  }


  async getPhoneNumber() {

    try {
      const phoneNumber = await AsyncStorage.getItem('@phoneNumber:key');
      if (phoneNumber !== null) {
        this.setState({ userPhoneNumber: phoneNumber })

        
        return phoneNumber;
      }
      return "";
    }
    catch (error) {
      console.warn(error);
      return "";
    }
  }

  async getContactAccessPermission() {

    try {
      const contactAccess = await AsyncStorage.getItem('@contactAccess:key');
      if (contactAccess !== null) {
        this.setState({ isContactFetched: contactAccess })

        return contactAccess;
      }
      return "";
    }
    catch (error) {
      console.warn(error);
      return "";
    }
  }


  render() {
    console.log('initial')
    return (
      <Container>
        <View styel={{backgroundColor: 'blue'}}>

        </View>
        <Loading isLoading={this.state.isLoading}/>
        </Container>
    );
  }

}

function bindAction(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  user: state.user.name,
});

export default connect(mapStateToProps, bindAction)(InitialView);
