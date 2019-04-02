import React from "react";
import { SafeAreaView } from "react-native";
import FlatListDemo from "./SearchableList";
import FlatListDemo2 from "./SearchableList2";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <FlatListDemo /> */}
        <FlatListDemo2 />
      </SafeAreaView>
    );
  }
}
