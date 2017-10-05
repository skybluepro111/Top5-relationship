import React, { Component } from 'react';
import { Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Button, View, ListItem, Icon } from 'native-base';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;




export default class ContactCell extends Component{

    

    render(){

        let contact = this.props.contact;
        let name = contact.givenName + " " + contact.familyName

        var iconName = this.props.isFavourite ? "ios-heart" : "ios-heart-outline"
        // 

        return (
        
        <TouchableOpacity onPress={()=> this.props.showContactDetail(this.props.contact)}>
        <View style={{height: 41, backgroundColor: 'white'}}>
          <View style={{height: 40, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 10, width: deviceWidth - 65, fontSize: 14}}>{name}</Text>
            <TouchableOpacity style={{padding: 10}} onPress={()=> this.props.setFavoritesAction(this.props.contact)}>
            <Icon style={{justifyContent: 'flex-end'}} name={iconName} />
            </TouchableOpacity>
            </View>
          </View>
        <View style={{height: 1, width: deviceWidth, backgroundColor: '#BDBDBD', alignSelf: 'flex-end', justifyContent:'flex-end'}}></View>

        </View>
        </TouchableOpacity>
        );
    }

}