
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').width / 375;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null
  },
  inputOuterView: {    
    borderColor: 'white', 
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
    marginTop: 4
  },
    inputOuterView1: {    
    borderColor: 'white', 
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
    marginTop: 4,
    marginLeft: 0
  },
  inputView: {
    marginLeft: 8,
    height: 40,
    color: 'white',

  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    marginLeft: 25,
    fontSize: 14
  }

};
