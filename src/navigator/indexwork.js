import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator,TextInput, Button } from 'react-native'
import { Container, Content, View, Text, List, ListItem, Thumbnail, Left, Right, Body, Form, Item, Input, Label } from 'native-base';
import axios from 'axios';
import { ServicesAPI } from '../../API_Services';
import Headers from './Headers';

const styles = {
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#FFF',
    },
    textBalance: {
        color: '#FF7D1D',
        fontSize: 24,
        fontWeight: 'bold'
    },
    content: {
        backgroundColor: '#EFF3F6',
        paddingTop: 16
    },
    badge: {
        fontSize: 8,
        alignSelf: 'flex-start',
        padding: 4,
        borderRadius: 16,
        backgroundColor: '#EE2B2E',
        color: '#FFF',
        marginTop: 6,
        marginLeft: -4
    }
}

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      isLoaded: false,
      isFetchError: false
    };
  }

  async getDataList() {
    try {
      const getData = await ServicesAPI.getRequest('contact')
      console.log(getData)
      if (getData.data) {
        let temp = getData.data;
        let dataList = temp.data ? temp.data : [];
        this.setState({
          dataList,
          isLoaded: true
        });
      }
    } catch {
      this.setState({
        isFetchError: true
      },
      console.log(isFetchError)
      );
    }
  }


  componentDidMount() {
    this.getDataList()
  }

      onPressButton() {
//          let data = {
//              method: 'POST',
//              body: JSON.stringify({
//                  firstName: this.state.firstName,
//                  lastName: this.state.lastName
//              }),
//              headers: {
//                  'Accept': 'application/json',
//                  'Content-Type': 'application/json',
//              }
//          }

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
                   }).
                   catch(function(error){
                    console.log('ERROR::', error.response.data);
                   })
      }

      renderButton() {

          return (
              <Button
                  onPress={() => this.onPressButton()}
                  title="Post API"
                  color="#FF8976"
              />
          );
      }

    render() {
        const { dataList, isLoaded, isFetchError} = this.state;
        return (
            <Container>
                <Headers />
                {isLoaded ?
                  <>
                    {dataList.length > 0 ?
                      <Content style={{ backgroundColor: '#EFF3F6' }}>
                        <FlatList
                          data={dataList}
                          renderItem={({ item }) =>
                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, borderTopColor: '#DCDEE3' }, item.seq > 1 ? { borderTopWidth: 1 } : { borderTopWidth: 0 }]} key={item.seq}>
                              <View style={{ flex: 3, paddingVertical: 16 }}>
                                <Thumbnail square style={{ borderRadius: 4, borderWidth: 1, borderColor: '#DCDEE3' }} source={item.photo === 'N/A' ? require('../../assets/images/profile.jpg') : { uri: item.photo }} />
                              </View>
                              <View style={{ flex: 8, paddingVertical: 16 }}>
                                <Text style={{ width: '90%', fontSize: 14, color: '#151823' }} numberOfLines={2}>{item.lastName} {item.firstName}</Text>
                                <Text style={{ width: '90%', fontSize: 14, color: '#151823' }}>Age : {item.age}</Text>
                              </View>
                            </View>}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </Content>
                      :
                      <>
                        <View style={{ backgroundColor: '#fff' }}>
                          <Text>Tidak ada data</Text>
                        </View>
                      </>
                    }
                  </>
                  :
                  <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    {!isFetchError ?
                      <View>
                        <ActivityIndicator size="large" color="#FF7D1D" animating={true} />
                      </View>
                      :
                      <Text>Gagal mengambil data</Text>
                    }
                  </View>
                }
                <View>

                    <Text>First Name</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ firstName: text })}
                        value={this.state.firstName}
                    />

                    <Text>Last Name</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ lastName: text })}
                        value={this.state.lastName}
                    />

                    <Text>Age</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ age: text })}
                        value={this.state.Age}
                    />

                    <Text>
                        {JSON.stringify(this.state.data)}
                    </Text>

                    {this.renderButton()}

                    </View>
            </Container>
        )
    }
}

export default index



const people = (obj, source) =>
Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

const person1= {firstName:"John",lastName:"Doe",age:50,eyeColor:"Blue"};
const person2= {firstName:"John",lastName:"Doe",age:50,eyeColor:"Blue"};

function jsonEqual(a,b) {
    return JSON.stringify(a) === JSON.stringify(b)
}
jsonEqual(person1,person2)

two way data binding : setiap perubahan yang kita lakukan di js akan berpengaruh terhadap tampilan. dan sebaliknya perubahan tampilan berpengaruh terhadap value di js
