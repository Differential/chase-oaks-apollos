import React, { useCallback } from 'react';
import { View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Button,
  H1,
  H4,
  Icon,
  withTheme,
  PaddedView,
  styled,
  Themer,
} from '@apollosproject/ui-kit';

import { useNavigation, useTheme } from '@react-navigation/native';
import { Slide } from '@apollosproject/ui-onboarding';

const Layout = styled({
  flex: 1,
  justifyContent: 'space-between',
})(SafeAreaView);

const BrandIcon = withTheme(
  ({ theme, color }) => ({
    name: 'brand-icon',
    size: theme.sizing.baseUnit * 5,
    ...(color ? { fill: color } : {}),
    style: {
      marginBottom: theme.sizing.baseUnit,
    },
  }),
  'ui-onboarding.Landing.BrandIcon'
)(Icon);

const Content = styled({
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '15%',
})(PaddedView);

const Title = styled({ textAlign: 'center' })(H1);
const Subtitle = styled(({ theme }) => ({
  textAlign: 'center',
  width: '60%',
  paddingTop: theme.sizing.baseUnit,
}))(H4);

const StyledImageBackground = styled({ width: '100%', height: '100%' })(
  ImageBackground
);

const Landing = () => {
  const navigation = useNavigation();

  const onPressPrimary = useCallback(() => navigation.navigate('Auth'), [
    navigation.navigate,
  ]);

  return (
    <Themer theme={{ type: 'dark' }}>
      <StyledImageBackground source={require('./landing.png')}>
        <Slide scrollEnabled={false}>
          <Layout>
            <View />
            <Content>
              <BrandIcon />
              <Title>Hey 👋!</Title>
              <Subtitle>Build a daily spiritual habit with others.</Subtitle>
            </Content>
            <PaddedView vertical={false}>
              <Button
                onPress={onPressPrimary}
                title="Let's Go!"
                type="secondary"
                pill={false}
              />
            </PaddedView>
          </Layout>
        </Slide>
      </StyledImageBackground>
    </Themer>
  );
};

export default Landing;
