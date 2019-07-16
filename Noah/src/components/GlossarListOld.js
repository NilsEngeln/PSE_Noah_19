import React, { Component } from 'react';
import { FlatList, View, ScrollView, Platform, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import GlossarSection from './GlossarSection';
import { iosFix } from '../utils';


class GlossarList extends Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  renderItem(glossar) {
    return <GlossarSection glossar={glossar.item} />;
  }

  renderSearch() {
    const { search } = this.state;
    console.log('renderSearch');
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    );
  }


  renderContent() {
    console.log(this.props);
    console.log('data_glossary:', this.props.glossary);
    console.log('searchstate', this.state.search);

    return (
      <ScrollView>
        <View style={{ backgroundColor: 'transparent' }}>                  
                            {this.renderSearch() }
        </View> 
        <FlatList 
          data={this.props.glossary}
          renderItem={this.renderItem}
          keyExtractor={(glossar) => glossar.key}
        />
      </ScrollView>
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
