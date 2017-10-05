import React, { Component } from "react";
import { Image, Animated, TextInput, ScrollView, Dimensions, Alert } from "react-native";
import { connect } from "react-redux";
import ContactList from "../contactList/"
import FavouriteList from "../FavouriteList/"
import {
  Container,
   Header,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Form, Label,
  Left,
  Body,
  Right,
    Title,
    Footer,
    FooterTab
} from "native-base";
import { setUser } from "../../actions/user";
import styles from "./styles";
import Contacts from "react-native-contacts"

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Home extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      isSearchView: false,
      searchStr: "",
      isContactListSelected: true
    };

  }

  setUser(data) {
    this.props.setUser(data);
  }

  showContactDetail(contact){
    var user = this.props.user;
    user.contactDetail = contact;
    this.props.navigation.navigate("ContactDetail")
  }


  getFooterView(){
    if(this.state.isContactListSelected){
        return(<Footer>
          <FooterTab>
            <Button active>
              <Text>Contact List</Text>
            </Button>
            <Button onPress={()=>this.setState({isContactListSelected: false})}>
              <Text>Favourites</Text>
            </Button>
          </FooterTab>
        </Footer>);
    }
    else{
      return(<Footer>
          <FooterTab>
            <Button onPress={()=>this.setState({isContactListSelected: true})}>
              <Text>Contact List</Text>
            </Button>
            <Button active>
              <Text>Favourites</Text>
            </Button>
          </FooterTab>
        </Footer>);
    }
  }


  render() {

    let mainView = this.state.isContactListSelected ? <ContactList showContactDetail={(contact)=>this.showContactDetail(contact)}/> : <FavouriteList showContactDetail={(contact)=>this.showContactDetail(contact)}/>


    return (
      <Container>  
      {mainView}

      
      {this.getFooterView()}
        

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

Home.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(Home);
