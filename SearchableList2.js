import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { rt_marketDB } from "./firebase";

import { ListItem, SearchBar } from "react-native-elements";

class FlatListDemo2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null
    };

    this.array = [];
  }

  componentWillMount() {
    // this._makeRemoteRequest();
    this._getFirebaseData();
  }

  _getFirebaseData = () => {
    const rt_market_ref = rt_marketDB.database().ref("codes");
    // let array = [];
    rt_market_ref.on("value", snapshot => {
      // console.log(snapshot.val().stockMkt);
      snapshot.forEach(market => {
        // console.log(market.key);
        if (market.key != "indexMkt") {
          market.forEach(stock => {
            this.array.push(stock.val());
          });
        }
      });
      console.log(this.array);
      this.array.sort((a, b) => {
        return a.stockName < b.stockName
          ? -1
          : a.stockName > b.stockName
          ? 1
          : 0;
      });
      this.setState({ rt_marketData: this.array });
    });
    // this.arrayholder = array;
  };

  _makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  _searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.array.filter(item => {
      const itemData = `${item.stockName.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      rt_marketData: newData
    });
  };

  _consolelog = () => {
    console.log(this.array);
  };

  _renderHeader = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity onPress={this._consolelog}>
          <Text>ConsoleLog</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={this._getFirebaseData}>
          <Text>_getFirebaseData</Text>
        </TouchableOpacity> */}
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={text => this._searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </SafeAreaView>
    );
  };

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View
    //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //     >
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.rt_marketData}
          renderItem={({ item }) => (
            <ListItem title={`${item.stockName}`} subtitle={item.stockCode} />
          )}
          keyExtractor={item => item.stockCode}
          ItemSeparatorComponent={this._renderSeparator}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    );
  }
}

export default FlatListDemo2;
