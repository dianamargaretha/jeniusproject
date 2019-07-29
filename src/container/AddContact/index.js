import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator,TextInput, Button,Modal } from 'react-native'
import { Container, Content, View, Text, List, ListItem, Thumbnail, Left, Right, Body, Form, Item, Input, Label,Icon,Header,Title } from 'native-base';
import axios from 'axios';


class AddContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: ""
    };
  }


  componentDidMount() {
  }

      onPressButton() {

            const params = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age
        };

          axios.post('https://simple-contact-crud.herokuapp.com/contact', params, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            }
          })
                   .then(res => {
                       this.setState({
                           isLoaded: false,
                           data: params
                       })
                       this.props.handleSave(params)

                   }).
                   catch(function(error){
                    console.log('ERROR::', error.response.data);
                   });
      }

      renderButton() {
          return (
              <Button
                  onPress={() => this.onPressButton()}
                  title="Tambah"
                  color="#23a4dc"
              />
          );
      }

    render() {
        const {show,handleClose} = this.props
        console.log(this.props)
        return (
            <Modal
                animationType="slide"
                visible={show}
            >
            <Header style={{backgroundColor:'#23a4dc'}}>
                <Left style={{ marginLeft: 4 }}>
                    <TouchableOpacity  onPress={handleClose}>
                        <Icon type="AntDesign" name="arrowleft" style={{color:'#fff'}}/>
                    </TouchableOpacity>
                </Left>
                <Body style={{ marginLeft: -28 }}>
                    <Title>Tambah Kontak</Title>
                </Body>
            </Header>
                <Content style={{ backgroundColor: '#EFF3F6' }}>
                    <View style={{padding:16}}>

                        <TextInput
                            placeholder='First Name'
                            onChangeText={(text) => this.setState({ firstName: text })}
                            value={this.state.firstName}
                        />

                        <TextInput
                            placeholder='Last Name'
                            onChangeText={(text) => this.setState({ lastName: text })}
                            value={this.state.lastName}
                        />

                        <TextInput
                            placeholder='Age'
                            onChangeText={(text) => this.setState({ age: text })}
                            value={this.state.Age}
                        />

                        {this.renderButton()}

                        </View>
                </Content>
            </Modal>
        )
    }
}

export default AddContactModal