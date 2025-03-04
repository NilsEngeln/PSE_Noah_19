import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux';


class MainMenu extends Component {
    resetFragen() {
        this.props.resetKatalog();
        console.log('reset');
        actions.toLearn();
        console.log(this.props);
    }
    renderContent() {
        const width = Dimensions.get('window').width;
        const anpass = width * 0.93;

        const styles = StyleSheet.create({
            image: {
                width: '100%',
                height: 220,
                marginTop: 30,
                resizeMode: 'contain' 
            },
            container: {
                width: anpass,

            },
            logo: {
                width: '100%',
                height: 90,
                marginTop: 30,
                resizeMode: 'contain'

                /*},
                    first: {
                    width: '100%',
                    height: 220,
                */

                /*
                    --Die alte Mediathek--
                    --Um zu reaktivieren, wieder mit der unten zu findenden Videos2 tauschen!--

                    <TouchableOpacity onPress={actions.toVideos2} style={styles.container}>
                        <Image source={require('../assets/img/Videos.png')} style={styles.image} />
                    </TouchableOpacity>
                */
               
            }
        });
        return (
            <View>
                <Image source={require('../assets/img/Logo.png')} style={styles.logo} />
            

            <ScrollView horizontal={true} 
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
    
                
                
                
                <TouchableOpacity onPress={() => this.resetFragen()} style={styles.container}>
                    <Image source={require('../assets/img/Fragenkatalog.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toVideos2} style={styles.container}>
                    <Image source={require('../assets/img/Videos.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toLearnStart} style={styles.container}>
                    <Image source={require('../assets/img/Fragebogen.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toTests} style={styles.container}>
                    <Image source={require('../assets/img/Pruefungsmodus.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={actions.toGlossar} style={styles.container}>
                    <Image source={require('../assets/img/Glossar.png')} style={styles.image} />
                </TouchableOpacity>

                
            </ScrollView>
            </View>
        );
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

const mapStateToProbs = state => {
    return { quiz: state.selectedFb, learn: state.learn };
};

export default connect(mapStateToProbs, actions)(MainMenu);
