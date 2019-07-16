import React, { Component } from 'react';
import { FlatList, View, ScrollView, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import GlossarSection from './GlossarSection';
import { iosFix } from '../utils';


class GlossarList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: this.props.glossary,
          error: null,
        };
        
        this.arrayholder = this.props.glossary;
        console.log('ArrayHolder: ', this.arrayholder); //funktioniert
        console.log('data: ', this.state.data);         //funktioniert
        //console.log('this.props.glossary.data.title', this.props.glossary.data.title);
      }
     

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    console.log('this.arrayholder.title', this.arrayholder.map);
    console.log('searchData', text);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  renderContent() {
    if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                title={item.data.title} 
                subtitle={item.data.description}
              />
            )}
            keyExtractor={glossar => glossar.key}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      );
  }

  render() {
      if (Platform.OS === 'ios') {
          return (
              <ImageBackground
                  source={iosFix.path}
                  style={iosFix.style}
              >
                  {this.renderContent()}
              </ImageBackground>
          );
      }
      return (
          this.renderContent()
      );
  }
}

const mapStateToProps = state => {
  return { glossary: state.glossary };
};

export default connect(mapStateToProps)(GlossarList);
