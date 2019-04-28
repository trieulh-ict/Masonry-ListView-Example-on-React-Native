import React from "react";
import { Text, TouchableHighlight } from "react-native";

export class ViewSelector extends React.Component {
  constructor(props) {
    super(props);
  }
  onPressHandler = () => {
    this.props.viewChange();
  };
  render() {
    return (
      <TouchableHighlight
        style={{
          width: "100%",
          height: 60,
          paddingTop: 20,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "space-around"
        }}
        onPress={this.onPressHandler}
      >
        <Text style={{ color: "white" }}>Remove First Item</Text>
      </TouchableHighlight>
    );
  }
}
