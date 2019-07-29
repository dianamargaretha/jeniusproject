import React, { Component } from 'react';
import Main from './Main'
import { StyleProvider } from 'native-base';
import getTheme from './src/theme/components';
import theme from './src/theme/variables/platform';

export default class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
                <StyleProvider style={getTheme(theme)}>
                    <Main />
                </StyleProvider>
        );
    }
}