import React, { Component } from "react";
import Initial from "../components/InitialView/";
import Login from "../components/login/";
import Signup from "../components/signup/";
import DigitPin from "../components/digitPin/";
import ContactList from "../components/contactList/";
import ImportContacts from "../components/importContacts/";
import ContactDetail from "../components/ContactDetail/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Initial: { screen: Initial },
  Login: { screen: Login },
  Signup: { screen: Signup },
  DigitPin: { screen: DigitPin },
  ImportContacts: { screen: ImportContacts },
  ContactList: { screen: ContactList },
  ContactDetail: { screen: ContactDetail },
  Home: { screen: Home },
  BlankPage: { screen: BlankPage }
},
{
  initialRouteName: 'Initial',
}));
