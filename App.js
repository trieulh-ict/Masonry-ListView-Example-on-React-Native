import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { DataProvider, RecyclerListView } from "recyclerlistview";
import { LayoutUtil } from "./src/utils/LayoutUtil";
import { DataCall } from "./src/utils/DataCall";
import { ViewSelector } from "./src/components/ViewSelector";
import { ImageRenderer } from "./src/components/ImageRenderer";

export default class App extends Component {
  state = {
    dataProvider: new DataProvider((r1, r2) => {
      r1 !== r2;
    }),
    layoutProvider: LayoutUtil.getLayoutProvider(0),
    images: [],
    count: 0,
    viewType: 0,
    inProgress: false
  };

  componentWillMount() {
    this.fetchMoreData();
  }

  viewChangeHandler = viewType => {
    this.setState({
      layoutProvider: LayoutUtil.getLayoutProvider(viewType),
      viewType: viewType
    });
  };

  renderFooter = () => {
    return this.state.inProgress ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={"black"} />
    ) : (
      <View style={{ height: 60 }} />
    );
  };

  rowRenderer = (type, data) => {
    //We have only one view type so not checks are needed here
    return <ImageRenderer imageUrl={data} />;
  };

  async fetchMoreData() {
    if (!this.state.inProgress) {
      console.log("Start");
      //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
      //more than once
      this.setState({ inProgress: true });
      const images = await DataCall.get(this.state.count, 20);
      this.setState({
        inProgress: false,
        dataProvider: this.state.dataProvider.cloneWithRows(
          this.state.images.concat(images)
        ),
        images: this.state.images.concat(images),
        count: this.state.count + 20
      });
    }
  }

  handleListEnd = () => {
    this.fetchMoreData();
    this.setState({});
  };

  render() {
    //Only render RLV once you have the data
    return (
      <View style={styles.container}>
        <ViewSelector
          viewType={this.state.viewType}
          viewChange={this.viewChangeHandler}
        />
        {this.state.count > 0 ? (
          <RecyclerListView
            style={{ flex: 1 }}
            contentContainerStyle={{ margin: 3 }}
            onEndReached={this.handleListEnd}
            dataProvider={this.state.dataProvider}
            layoutProvider={this.state.layoutProvider}
            rowRenderer={this.rowRenderer}
            renderFooter={this.renderFooter}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between"
  }
});
