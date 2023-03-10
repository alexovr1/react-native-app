import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {useDispatch} from 'react-redux';
import {authSignUpUser} from '../../redux/auth/authOperations';

import { styles } from '../../styles';
import initialState from '../../templates/initialstate';

import imageBG from '../../images/bg-photo.png';
import add from '../../images/add.png';
import edit from '../../images/edit.png';
import defaultImage from '../../images/avatar_default.png';

export default function RegistrationScreen({navigation}) {
  
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };

    Dimensions.addEventListener("change", onChange);
    
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry((prevState) => !prevState);
  };

  const handleSubmit = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      dispatch(authSignUpUser(state));
      setState(initialState);
    };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground source={imageBG} style={styles.imageBG}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={{...styles.form,
              paddingBottom: isShowKeyboard ? 145 : 45,
              width: dimensions,
            }}>
              <View style={styles.avatar}>
                {!state.image 
                  ? <Image source={state.image} style={styles.image}/>
                  : <Image source={defaultImage} style={styles.image}/>
                }
                <TouchableOpacity onPress={() => setState(prevState => ({...prevState, image: value}))}>
                  {!state.image
                  ? <Image source={add} style={styles.user}/>
                  : <Image source={edit} style={styles.user}/>}
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Registration</Text>
              <TextInput
                name='nickname'
                value={state.nickname}
                placeholder='Login'
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, nickname: value}))}
              />
              <TextInput
                name='email'
                value={state.email}
                placeholder='Email address'
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, email: value}))}
              />
              <View style={styles.password}>
              <TextInput
                name='password'
                value={state.password}
                autoComplete='off'
                placeholder='Password'
                secureTextEntry={isSecureTextEntry}
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, password: value}))}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.showPassword}
                onPress={toggleSecureTextEntry}
              >
                <Text style={styles.showBtn}>Show</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.text}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={{color: '#1B4371'}}>
                  Do you already have an account?
                  <Text> Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};