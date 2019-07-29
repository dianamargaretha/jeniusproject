import React from 'react';
import { Header, Body, Right, Button, Text,Icon } from 'native-base';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Headers extends React.Component {
    render() {
        return (
            <Header noLeft noShadow style={{ backgroundColor: 'white', borderBottomColor: '#EFF3F6', borderBottomWidth: 1 }}>
                <Body>
                    <Icon name='home' />
                    <Text>Add Contact</Text>
                </Body>
            </Header>
        )
    }
}

export default Headers;