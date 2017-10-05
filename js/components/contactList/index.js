import React, { Component } from "react";
import { Image, Animated, TextInput, ScrollView, Dimensions, Alert } from "react-native";
import { connect } from "react-redux";
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
import Database from "../../database/";
import ContactCell from "./contactCell";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class ContactList extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      isSearchView: false,
      searchStr: ""
    };

  }

  setUser(data) {
    this.props.setUser(data);
  }


  getContactCellList(){
      let contacts = this.props.user.contacts
      var contactListArr = []
      contacts.map((contact) => {
          let name = contact.givenName + " " + contact.familyName;
          if(name.toUpperCase().includes(this.state.searchStr.toUpperCase())){
            let isFav = this.checkIsFavourite(contact)
            contactListArr.push(<ContactCell contact={contact} isFavourite={isFav} setFavoritesAction={(contact)=>this.setFavourite(contact)} showContactDetail={(contact)=>this.showContactDetail(contact)}/>)
          }
          
      })
      return contactListArr;
  }


  checkIsFavourite(contact){
    
    
    let favList = this.props.user.favList;
    if(favList !== undefined){
      var i = 0;
        for(i = 0; i < favList.length; i++){
          let contactId = favList[i];
          if(contactId == contact.recordID){
            return true;
          }
        }
    }
    return false;
  }

  setFavourite(contact){
  
     var favList = this.props.user.favList;
     if(favList === undefined){
        favList = [];
     }


     if (this.checkIsFavourite(contact)) {

       let tempFavArray = []
       favList.map((fav) => {
         if (fav !== contact.recordID) {
           tempFavArray.push(fav)
         }
       })
       favList = tempFavArray
       Database.removeFavorites(this.props.user.phoneNumber, contact.recordID);

     }
     else{
      if(favList.length >= 5){
       Alert.alert("Alert", "You can mark only 5 contact as favourite.")
     }
     else{
        favList.push(contact.recordID);
        Database.setFavouriteContact(this.props.user.phoneNumber, contact.recordID);
        
      }
     }
        let userData = this.props.user;
        userData.favList = favList;
        this.setUser(userData);
        
        this.forceUpdate()

  }

  showContactDetail(contact){
    this.props.showContactDetail(contact)
  }

  getHeaderView(){
      if(this.state.isSearchView){
        return(<Header searchBar rounded>
           <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(searchStr) => this.setState({searchStr: searchStr})}/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={() => this.setState({searchStr: '', isSearchView: false})}>
            <Text>Cancel</Text>
          </Button>
        </Header>);
      }
      else{
        return(<Header searchBar rounded>
          <Left>
            </Left>
           <Body>
             <Title>Contact List</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.setState({isSearchView: true})}
            >
              <Icon active name="ios-search" />
            </Button>
          </Right>
        </Header>);
      }
  }

  render() {



    return (
      <Container>  
      {this.getHeaderView()}


      <ScrollView>
        {this.getContactCellList()}
      </ScrollView>

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

ContactList.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(ContactList);
