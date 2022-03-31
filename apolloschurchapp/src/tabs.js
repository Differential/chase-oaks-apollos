import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  withTheme,
  Icon,
  Touchable,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import {
  createFeatureFeedTab,
  UserAvatarConnected,
  ConnectScreenConnected,
} from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import ActionTable from './ui/ActionTable';
import ActionBar from './ui/ActionBar';

const HeaderLogo = withTheme(({ theme }) => ({
  style: {
    height: theme.sizing.baseUnit * 2.5,
    width: '70%',
    resizeMode: 'contain',
  },
  source:
    theme.type === 'light'
      ? require('./tabs/wordmarkLight.png')
      : require('./tabs/wordmarkDark.png'),
}))(Image);

const SearchIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'search',
  size: baseUnit * 2,
  fill: colors.primary,
}))(Icon);

const SearchButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <SearchIcon />
  </Touchable>
);

const tabBarIcon = (name) => {
  function TabBarIcon({ color }) {
    return <Icon name={name} fill={color} size={24} />;
  }
  TabBarIcon.propTypes = {
    color: PropTypes.string,
  };
  return TabBarIcon;
};

const Avatar = withTheme(({ theme: { sizing: { baseUnit } } }) => ({
  size: 'xsmall',
}))(UserAvatarConnected);

const ProfileButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <View>
      <Avatar />
    </View>
  </Touchable>
);

ProfileButton.propTypes = {
  onPress: PropTypes.func,
};

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <ProfileButton
      onPress={() => {
        navigation.navigate('UserSettingsNavigator');
      }}
    />
  );
};
const HeaderCenter = () => <HeaderLogo />;
const HeaderRight = () => {
  const navigation = useNavigation();
  return <SearchButton onPress={() => navigation.navigate('Search')} />;
};

const CustomConnectScreen = () => (
  <ConnectScreenConnected
    showAvatar={false}
    ActionTable={ActionTable}
    ActionBar={ActionBar}
  />
);

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  options: {
    headerCenter: HeaderCenter,
    headerRight: HeaderRight,
    headerLeft: HeaderLeft,
    headerLargeTitle: false,
  },
  tabName: 'Home',
  feedName: 'HOME',
});

const ExploreTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLeft,
    headerRight: HeaderRight,
  },
  tabName: 'Explore',
  feedName: 'READ',
});

const WatchTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLeft,
    headerRight: HeaderRight,
  },
  tabName: 'Watch',
  feedName: 'WATCH',
});

const ConnectTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLeft,
    headerRight: HeaderRight,
  },
  tabName: 'Connect',
  TabComponent: CustomConnectScreen,
});

const { Navigator, Screen } = createBottomTabNavigator();

const ThemedTabNavigator = withTheme(({ theme }) => ({
  tabBarOptions: {
    activeTintColor: theme.colors.primary,
  },
}))(Navigator);

const TabNavigator = () => {
  const client = useApolloClient();
  // this is only used by the tab loaded first
  // if there is a new version of the onboarding flow,
  // we'll navigate there first to show new screens
  useEffect(
    () => {
      checkOnboardingStatusAndNavigate({
        client,
        navigation: NavigationService,
        navigateHome: false,
      });
    },
    [client]
  );
  return (
    <ThemedTabNavigator lazy>
      <Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: tabBarIcon('house') }}
      />
      <Screen
        name="Watch"
        component={WatchTab}
        options={{ tabBarIcon: tabBarIcon('watch') }}
      />
      <Screen
        name="Explore"
        component={ExploreTab}
        options={{ tabBarIcon: tabBarIcon('explore') }}
      />
      <Screen
        name="Connect"
        component={ConnectTab}
        options={{ tabBarIcon: tabBarIcon('connect') }}
      />
    </ThemedTabNavigator>
  );
};

export default TabNavigator;
