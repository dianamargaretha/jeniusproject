import React from 'react';
import { Header, Body, Right, Button, Text } from 'native-base';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Headers extends React.Component {
    render() {
        return (
            <Header noLeft noShadow style={{ backgroundColor: 'white', borderBottomColor: '#EFF3F6', borderBottomWidth: 1 }}>
                <Body>
                    <Image
                        style={{ width: 190, height: 45 }}
                        source={require('../../assets/images/jenius-logo.png') }
                    />
                </Body>
            </Header>
        )
    }
}

export default Headers;