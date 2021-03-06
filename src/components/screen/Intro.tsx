import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
  FlatList,
  InteractionManager,
  AsyncStorage,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import { auth } from '../../firebase';
import AppUserProfile from '../screen/AppUserProfile';

import {
  IUser,
} from '../../types';
import { AppProvider as Provider, AppConsumer, AppContext } from '../../providers';

import styled from 'styled-components/native';

import { ThemeType } from '../../theme';
import { IC_MASK } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import Button from '../shared/Button';

interface IProps {
  store?: any;
  navigation: NavigationScreenProp<NavigationStateRoute<any>>;
}

function Intro(props: IProps) {
  let timer: any;
  const { state, dispatch } = React.useContext(AppContext);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const onLogin = () => {
    dispatch({ type: 'reset-user' });
    setIsLoggingIn(true);
    timer = setTimeout(() => {
      const user: IUser = {
        displayName: 'dooboolab',
        age: 30,
        job: 'developer',
      };
      // console.log(user);
      dispatch({ type: 'set-user', payload: user });
      setIsLoggingIn(false);
      clearTimeout(timer);
    }, 1000);
  };

  const onLogout = () => {
    AsyncStorage.clear();
    auth.doSignOut();
    props.navigation.navigate('UserAuthe');
  }

  const changeTheme = () => {
    let payload: object;
    if (state.theme === ThemeType.LIGHT) {
      payload = {
        theme: ThemeType.DARK,
      };
    } else {
      payload = {
        theme: ThemeType.LIGHT,
      };
    }
    dispatch({
      type: 'change-theme-mode',
      payload,
    });
  };

  return (
    <Container>
      <ContentWrapper>
        <AppUserProfile />
        <StyledText
          style={{
            marginTop: 100,
          }}
        >{state.user.displayName}</StyledText>
        <StyledText>{state.user.age ? state.user.age : ''}</StyledText>
        <StyledText>{state.user.job}</StyledText>
        <StyledText>{state.inputs}</StyledText>
      </ContentWrapper>
      <ButtonWrapper>
        {/* <Button
          testID='btn1'
          imgLeftSrc={IC_MASK}
          isLoading={isLoggingIn}
          onClick={() => onLogin()}
          text={getString('LOGIN')}
        /> */}
        <Button
          text='Logout'
          onClick={() => onLogout()}
        />
        <View style={{ marginTop: 8 }}/>
        {/* <Button
          testID='btn4'
          onClick={() => props.navigation.navigate('UserLogin') }
          text={'Produk List'}
        />
        <Button
          testID='btn2'
          onClick={() => props.navigation.navigate('AdminProdukEdit') }
          text={getString('NAVIGATE')}
        />
        <Button
          testID='btn4'
          onClick={() => props.navigation.navigate('AdminProduksList') }
          text={'Produk List'}
        />
        <View style={{ marginTop: 8 }}/>
        <Button
          testID='btn3'
          onClick={() => changeTheme() }
          text={getString('CHANGE_THEME')}
        /> */}

      </ButtonWrapper>
    </Container>
  );
}

export default Intro;

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }) => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const ContentWrapper = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40;
  width: 85%;
  align-self: center;
`;

const StyledText = styled.Text`
  font-size: 18;
  line-height: 27;
  color: ${({ theme }) => theme.fontColor};
`;
