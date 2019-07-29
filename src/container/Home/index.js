import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator,TextInput, Button } from 'react-native'
import { Container, Content, View, Text, List, ListItem, Thumbnail, Left, Right, Body, Form, Item, Input, Label } from 'native-base';
import axios from 'axios';
import { ServicesAPI } from '../../API_Services';
import Headers from './Headers';
import AddContactModal from './../AddContact';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      isLoaded: false,
      isFetchError: false,
      isLoading: true,
      data: "",
      modal: null,
      tambahContact: 'Tambah Kontak',
      firstName: '',
      lastName: '',
      age: ''
    };
  }
      openModal = modal => {
          this.setState({ modal })
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
        handleSaveTambahContact = (val) => {
            this.setState({
                data: [...this.state.data,val]
            })
            console.log(this.state,val)
            this.openModal(null)
        }
      closeModal = () => {
          this.setState({ modal: null })
      }


  componentDidMount() {
    axios.get('https://simple-contact-crud.herokuapp.com/contact')
       .then(res => {
            this.setState({
                isLoading: false,
                data: res.data.data,
            })
        })
  }

      renderItem(item) {
          const { firstName,lastName,age,photo } = item.item;
          return (
               <View style={[{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, borderTopColor: '#DCDEE3' }, item.seq > 1 ? { borderTopWidth: 1 } : { borderTopWidth: 0 }]} key={item.seq}>
                 <View style={{ flex: 3, paddingVertical: 16 }}>
                   <Thumbnail square style={{ borderRadius: 4, borderWidth: 1, borderColor: '#DCDEE3' }} source={photo === 'N/A' ? require('../../assets/images/profile.jpg') : { uri: photo }} />
                 </View>
                 <View style={{ flex: 8, paddingVertical: 16 }}>
                   <Text style={{ width: '90%', fontSize: 14, color: '#151823' }} numberOfLines={2}>{lastName} {firstName}</Text>
                   <Text style={{ width: '90%', fontSize: 14, color: '#151823' }}>Age : {age}</Text>
                 </View>
               </View>
          );
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
        const { show, handleClose } = this.props;
        const { dataList, isLoaded, isFetchError,modal, tambahContact,firstName,lastName,age} = this.state;
            if (this.state.isLoading) {
                return (
                    <View style={{ flex: 1, padding: 20 }}>
                        <ActivityIndicator />
                    </View>
                )
            }
        return (
            <Container>
                <Headers />
              <Content style={{ backgroundColor: '#EFF3F6' }}>
              <View>
                <FlatList
                  data={this.state.data}
                  renderItem={this.renderItem.bind(this)}
                  keyExtractor={(data,index) => index}
                />
                </View>
                 {modal === 'tambahContact' && (
                     <AddContactModal
                         navigation={this.props.navigation}
                         show={modal === 'tambahContact'}
                         handleClose={this.closeModal}
                         handleSave={this.handleSaveTambahContact}
                         value={tambahContact}
                     />
                 )}
                 <TouchableOpacity onPress={() => this.openModal('tambahContact')}>
                     <View style={{flexDirection:'row',justifyContent:'center',backgroundColor:'#7ca54e', marginHorizontal:16,paddingVertical:16}}>
                         <Text style={{color:'#fff'}}>Tambah Kontak</Text>
                     </View>
                 </TouchableOpacity>
                 </Content>
            </Container>
        )
    }
}

export default index