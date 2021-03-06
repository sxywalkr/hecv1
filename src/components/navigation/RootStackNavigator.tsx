import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, getActiveChildNavigationOptions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import IntroScreen from '../screen/Intro';
import TempScreen from '../screen/Temp';
import AdminHome from '../screen/AdminHome';
import UserAuthe from '../screen/UserAuthe';
import AppUserProfile from '../screen/AppUserProfile';
import ApotekHome from '../screen/Apotek/ApotekHome';
import ApotekListObat from '../screen/Apotek/ApotekListObat';
import ApotekEditObat from '../screen/Apotek/ApotekEditObat';
import ApotekDaftarAllPasien from '../screen/Apotek/ApotekDaftarAllPasien';
import UserPilihBooking from '../screen/User/UserPilihBooking';
import ResepsionisHome from '../screen/Resepsionis/ResepsionisHome';
import ResepsionisDaftarBooking from '../screen/Resepsionis/ResepsionisDaftarBooking';
import DokterHome from '../screen/Dokter/DokterHome';
import DokterDaftarAllPasien from '../screen/Dokter/DokterDaftarAllPasien';
import DokterDaftarHarianPasien from '../screen/Dokter/DokterDaftarHarianPasien';
import DokterDetailPasien from '../screen/Dokter/DokterDetailPasien';
import UserRekamMedik from '../screen/User/UserRekamMedik';
import BillingHome from '../screen/Billing/BillingHome';
import BillingDaftarAllPasien from '../screen/Billing/BillingDaftarAllPasien';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AdminHome,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: (() => (<Icon name='home' size={30} />)),
        tabBarVisible: true,
      },
    },
    Intro2: {
      screen: IntroScreen,
      navigationOptions: () => ({
        tabBarLabel: 'Profil',
        tabBarIcon: (() => (<Icon name='user-md' size={30} />)),
        tabBarVisible: true,
      }),
    },
  },
);

const routeConfig = {
  BottomTabNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: ({ navigation, screenProps }: { navigation: any, screenProps: any }) => {
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
      return {
        title: childOptions.title,
      };
    },
  },
  UserAuthe: {
    screen: UserAuthe,
  },
  AdminHome: {
    screen: AdminHome,
  },
  AppUserProfile: {
    screen: AppUserProfile,
  },
  ApotekHome: {
    screen: ApotekHome,
  },
  ApotekListObat: {
    screen: ApotekListObat,
  },
  ApotekEditObat: {
    screen: ApotekEditObat,
  },
  ApotekDaftarAllPasien: {
    screen: ApotekDaftarAllPasien,
  },
  UserPilihBooking: {
    screen: UserPilihBooking,
  },
  ResepsionisDaftarBooking: {
    screen: ResepsionisDaftarBooking,
  },
  ResepsionisHome: {
    screen: ResepsionisHome,
  },
  DokterHome: {
    screen: DokterHome,
  },
  DokterDaftarAllPasien: {
    screen: DokterDaftarAllPasien,
  },
  DokterDaftarHarianPasien: {
    screen: DokterDaftarHarianPasien,
  },
  DokterDetailPasien: {
    screen: DokterDetailPasien,
  },
  UserRekamMedik: {
    screen: UserRekamMedik,
  },
  BillingHome: {
    screen: BillingHome,
  },
  BillingDaftarAllPasien: {
    screen: BillingDaftarAllPasien,
  },
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      title: 'Intro',
    },
    path: 'intro',
  },
  Temp: {
    screen: TempScreen,
    navigationOptions: {
      headerTitle: <Text style={{
        fontSize: 18,
      }}>Temp</Text>,
    },
    path: 'temp',
  },

};

const navigatorConfig = {
  initialRouteName: 'BottomTabNavigator',
  gesturesEnabled: true,
  statusBarStyle: 'light-content',
  navigationOptions: ({ navigation, screenProps }: { navigation: any, screenProps: any }) => {
    const { theme } = screenProps;
    return ({
      headerStyle: {
        backgroundColor: theme.background,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: { color: theme.fontColor },
      headerTintColor: theme.tintColor,
    });
  },
};

const RootStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

interface IProps {
  navigation?: any;
  theme?: object;
}

class RootNavigator extends React.Component<IProps> {
  private static router = RootStackNavigator.router;

  public render() {
    return (
      <RootStackNavigator
        navigation={this.props.navigation}
        screenProps={{ theme: this.props.theme }}
      />
    );
  }
}

export default RootNavigator;
