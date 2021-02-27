import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Left, Body, Text, View, Item, Label, Input } from "native-base";
import { Image, StyleSheet, TouchableOpacity , ToastAndroid} from 'react-native'
import { setLoginfalse } from './../../utils/redux/ActionCreators/auth'
import {connect} from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '@env'

class addShipping extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        address_type: '',
        recipient_name: '',
        address: '',
        city: '',
        postal: '',
        phone: '',
        errorForm: ''
    }

    addAddress = () => {
        const regexPhone = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g
        if(!(this.state.phone.length >=11) || !(this.state.phone.length <= 15) || !regexPhone.test(this.state.phone)){
            ToastAndroid.show('Format pengisian no. HP salah', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }else{
            if (this.state.address_type !== '') {
                const addressData = {
                    address_type:this.state.address_type,
                    recipient_name:this.state.recipient_name,
                    address:this.state.address,
                    city:this.state.city,
                    postal:this.state.postal,
                    phone:this.state.phone,
                    user_id:this.props.auth.id
                }
                const config = {
                    headers: {
                        'x-access-token': 'Bearer ' + this.props.auth.token,
                    },
                };
                console.log(addressData)
                axios.post(BASE_URL + `/address/new`, addressData, config)
                    .then(({ data }) => {
                        ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                        this.props.navigation.navigate('Shipping')
                    }).catch(({ response }) => {
                        if (response.status == 401) {
                            ToastAndroid.show('SESI ANDA TELAH HABIS', ToastAndroid.SHORT, ToastAndroid.CENTER);
                            if (this.props.dispatch(setLoginfalse())) {
                                this.props.navigation.replace('Profile')
                            }
                        }
                    })
            } else {
                this.setState({
                    errorForm: 'Data tidak boleh kosong'
                })
            }
        }
    }

    render() {
        const { address_type, recipient_name, address, city, postal, phone } = this.state
        // console.log(this.state)
        // console.log(this.props.auth)
        return (
            <Container >
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', fontWeight: 'bold' }}>Add Shipping Address</Title>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                    <View style={{ height: 130, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'green' }}>Save address as (ex: home address, office address)</Label>
                            <Input value={address_type} onChangeText={(text) => { this.setState({ address_type: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Recipent Name</Label>
                            <Input name="email" value={recipient_name} onChangeText={(text) => { this.setState({ recipient_name: text }) }} />
                        </Item>
                    </View>
                    <View style={{ height: 195, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14 }}>Address</Label>
                            <Input name="email" value={address} onChangeText={(text) => { this.setState({ address: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>City or Subdistrict</Label>
                            <Input name="email" value={city} onChangeText={(text) => { this.setState({ city: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Postal Code</Label>
                            <Input name="email" value={postal} onChangeText={(text) => { this.setState({ postal: text }) }} />
                        </Item>
                    </View>
                    <View style={{ height: 75, width: 340, backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'gray' }}>Recipient Telephone Number</Label>
                            <Input name="email" value={phone} onChangeText={(text) => { this.setState({ phone: text }) }} />
                        </Item>
                    </View>
                    <Button full rounded danger
                        onPress={this.addAddress}
                    >
                        <Text style={{ color: 'white' }}>
                            Save Address
                            </Text>
                    </Button>
                    <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{this.state.errorForm}</Text>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(addShipping);

const styles = StyleSheet.create({
    floatingLabel: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 10
    }
})