import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { Root } from 'native-base';
import Home from '../container/Home';


const Main = createSwitchNavigator({
    Home: {
        screen: props => {
            return (<Home {...props} />)
        }
    }
});

const Apps = createAppContainer(Main);

export default () =>
    <Root>
        <Apps/>
    </Root>;