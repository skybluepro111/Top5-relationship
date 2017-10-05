import React, { Component } from "react";
import { Image, Animated, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import styles from "./styles";
import ImportContacts from "../importContacts/";

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0)
    };


  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  setUser(data) {
    this.props.setUser(data);
  }

  




  render() {
    console.warn(this.state.isUserLoggedIn);
    
      return (

        <Image
          style={styles.container}
          source={require('../../../images/login-background.png')}>
          <View style={styles.section}>
            <Image
              source={require('../../../images/topfive-logo.png')}
            />
          </View>

          <View style={styles.section}>
            <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
              top
          </Animated.Text>
            <Animated.Text style={[styles.h1, { marginTop: -30 }, this.fadeIn(700, 20)]}>
              five
          </Animated.Text>
            <Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>
              Crafted in
          </Animated.Text>
            <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
              SAN FRANCISCO, CALIFORNIA
          </Animated.Text>
          </View>

          <Button rounded bordered info style={styles.btn}
            onPress={() => this.props.navigation.navigate("Signup")}>
            <Text>Login</Text>
          </Button>
        </Image>
      );
    



  }



  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }

}

function bindAction(dispatch) {
  return {
    setUser: data => dispatch(setUser(data)),
  };
}

const mapStateToProps = state => ({
  user: state.user.name
});

Login.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, bindAction)(Login);
