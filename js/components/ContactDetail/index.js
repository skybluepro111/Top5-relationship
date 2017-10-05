import React, { Component } from "react";
import { Image, Animated, TextInput, ScrollView, Dimensions, Alert, TouchableOpacity } from "react-native";
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
  Card,
  CardItem
} from "native-base";
import { setUser } from "../../actions/user";
import styles from "./styles";
import Database from "../../database/";
import Swipeout from 'react-native-swipeout';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class ContactDetail extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      isSearchView: false,
      searchStr: "",
      text: "",
      descriptionRow: []
    };

  }

  componentDidMount(){
    let contact = this.props.user.contactDetail
    if(contact.description !== undefined){
      this.setState({descriptionRow: contact.description});
    }
  }

  setUser(data) {
    this.props.setUser(data);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  saveDescription(){
    let contact = this.props.user.contactDetail
    Database.saveContactsDescription(this.props.user.phoneNumber, contact.recordID, this.state.descriptionRow)

    let contactList = this.props.user.contacts;
    contactList.map((contactObj)=>{
      if(contactObj.recordID == contact.recordID){
        contactObj.description = this.state.descriptionRow
      }
    })
    let user = this.props.user;
    user.contacts = contactList;
    this.setUser(user);
    this.forceUpdate()
  }

  renderDescriptionRow(data, index){
    debugger;
    var swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { this.deleteDescription(index) }
  }
]

  return(
  <Swipeout right={swipeoutBtns}
  autoClose='true'>
  <View style={{paddingTop: 10, paddingBottom: 10, width: deviceWidth-36}}>
    <TextInput 
    placeholder="Write description about this contact.."
    value={data}
    onChangeText={(text) => this.descriptionChangeText(text, index)}
    multiline={true}
    style={{marginRight: 50, marginLeft: 8}}/>
  </View>
  <View style={{width: deviceWidth - 36, alignSelf: 'center', backgroundColor: 'rgb(150, 150, 150)', height: 1}}/>
</Swipeout>);
  }

  deleteDescription(index){
    let descriptionRows = this.state.descriptionRow
    descriptionRows.splice(index, 1);
    this.setState({descriptionRow: descriptionRows})
    
  }

  descriptionChangeText(data, index){
    let descriptionRows = this.state.descriptionRow
    descriptionRows[index] = data
    this.setState({descriptionRow: descriptionRows})
  }

  addDescriptionRow(){
    let descriptionRows = this.state.descriptionRow
    descriptionRows.push('')
    this.setState({descriptionRow: descriptionRows})
  }


  render() {

    console.warn(this.props.user)
    let contact = this.props.user.contactDetail
    let name = contact.givenName
    let fullName = contact.givenName + " " + contact.familyName



    var phnNumber = [];
    if (contact.phoneNumbers !== undefined && contact.phoneNumbers.length > 0) {
      phnNumber.push(<Text style={styles.headerText}>Phone Numbers</Text>)
      contact.phoneNumbers.map((phn) => {

        phnNumber.push(<Text style={{ fontSize: 14 }}>{this.toTitleCase(phn.label)}: {phn.number}</Text>);
      })
      phnNumber.push(<View style={{ height: 20 }} />)
    }


    var emailAddresses = [];
    if (contact.emailAddresses !== undefined && contact.emailAddresses.length > 0) {
      emailAddresses.push(<Text style={styles.headerText}>Email</Text>)
      contact.emailAddresses.map((email) => {
        emailAddresses.push(<Text style={{ fontSize: 14 }}>{this.toTitleCase(email.label)}: {email.email}</Text>);
      })
      emailAddresses.push(<View style={{ height: 20 }} />)
    }

        var addresses = [];
    if (contact.postalAddresses !== undefined && contact.postalAddresses.length > 0) {
      addresses.push(<Text style={styles.headerText}>Addresses</Text>)
      contact.postalAddresses.map((address) => {
        addresses.push(<Text style={{ fontSize: 12 }}>{this.toTitleCase(address.label)}: </Text>);
        addresses.push(<Text style={{ fontSize: 14, marginLeft: 30 }}>{this.toTitleCase(address.street)}</Text>);
        addresses.push(<Text style={{ fontSize: 14, marginLeft: 30 }}>{this.toTitleCase(address.city)}</Text>);
        addresses.push(<Text style={{ fontSize: 14 , marginLeft: 30}}>{this.toTitleCase(address.region)}</Text>);
        addresses.push(<Text style={{ fontSize: 14, marginLeft: 30 }}>{this.toTitleCase(address.country)}</Text>);
        addresses.push(<Text style={{ fontSize: 14, marginLeft: 30 }}>{this.toTitleCase(address.postCode)}</Text>);
        addresses.push(<View style={{ height: 5 }} />)
      })
      addresses.push(<View style={{ height: 20 }} />)
    }





    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon active name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{name}</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content>

          <Card>

            <CardItem>
              <Body>
                <View>
                  <Text style={styles.headerText}>Name</Text>
                  <Text style={styles.mainText}>{fullName}</Text>
                  {phnNumber}
                  {emailAddresses}
                  {addresses}
                </View>
              </Body>
            </CardItem>


            <CardItem>
              <Body>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

                  <View style={{ flex: 1, flexDirection: 'row', width: deviceWidth - 35, justifyContent: 'space-between' }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#1111FF',
                      alignSelf: 'flex-start'
                    }}>Description</Text>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}><Text style={{ margin: 5, marginTop: 0, color: '#1111FF', fontWeight: 'bold' }}
                      onPress={() => this.saveDescription()}
                    >Save</Text></TouchableOpacity>
                  </View>
                </View>

                {
                  this.state.descriptionRow.map((data, index)=>this.renderDescriptionRow(data,index))
                }

                  <Swipeout>
  <View style={{backgroundColor: 'white', paddingTop: 10, paddingBottom: 10}}>
    <TouchableOpacity onPress={()=>this.addDescriptionRow()}
    style={{alignItems: 'center', justifyContent:'center', width: deviceWidth - 36}}><Text style={{color: '#1111FF', fontWeight: 'bold'}}>ADD DESCRIPTION</Text></TouchableOpacity>
  </View>
</Swipeout>


              </Body>
            </CardItem>

            


          </Card>
        </Content>
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

ContactDetail.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(ContactDetail);
