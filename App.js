import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { DataProvider, RecyclerListView } from "recyclerlistview";
import { LayoutUtil } from "./src/utils/LayoutUtil";
import { DataCall } from "./src/utils/DataCall";
import { ViewSelector } from "./src/components/ViewSelector";
import { ImageRenderer } from "./src/components/ImageRenderer";
import _ from "lodash";
import uuidv1 from "uuid/v1";

export default class App extends Component {
  state = {
    dataProvider: new DataProvider((r1, r2) => {
      r1.key !== r2.key && r1.id != r2.id;
    }),
    layoutProvider: LayoutUtil.getLayoutProvider(0, []),
    images: [],
    newImages: [],
    viewType: 0,
    inProgress: false
  };

  componentWillMount() {
    this.fetchMoreData();
    this.checkDataToUpdateUI();
  }

  viewChangeHandler = viewType => {
    this.setState({
      layoutProvider: LayoutUtil.getLayoutProvider(viewType),
      viewType: viewType
    });
  };

  renderFooter = () => {
    return this.state.inProgress ? (
      <ActivityIndicator style={{ margin: 10 }} size="small" color={"black"} />
    ) : (
      <View style={{ height: 60 }} />
    );
  };

  rowRenderer = (type, data) => {
    //We have only one view type so not checks are needed here
    return (
      <ImageRenderer
        imageUrl={data.url}
        indexNumber={data.id}
        keyString={data.key}
      />
    );
  };

  checkDataToUpdateUI = () => {
    setInterval(() => {
      if (this.state.newImages.length > 0) {
        let newSortedArray = _.sortBy(
          _.unionBy(this.state.images, this.state.newImages, image => image.id),
          image => image.id
        );
        this.setState({
          inProgress: false,
          dataProvider: this.state.dataProvider.cloneWithRows(newSortedArray),
          images: newSortedArray,
          layoutProvider: LayoutUtil.getLayoutProvider(
            this.state.viewType,
            newSortedArray
          ),
          newImages: []
        });
      }
    }, 500);
  };

  async fetchMoreData() {
    if (!this.state.inProgress) {
      //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
      //more than once
      this.setState({ inProgress: true });
      const images = await DataCall.get();
      const currentCount =
        this.state.images.length + this.state.newImages.length;

      images.forEach((url, index) => {
        let id = currentCount + index + 1;
        Image.getSize(url, (width, height) => {
          let newImage = {
            id: id,
            key: uuidv1(),
            url: url,
            width: width,
            height: height
          };

          this.setState(prevState => ({
            newImages: _.unionBy(
              prevState.newImages,
              [newImage],
              image => image.id
            )
          }));
        });
      });
    }
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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
        {this.state.images.length > 0 ? (
          <RecyclerListView
            ref={ref => (this._recyclerListView = ref)}
            style={{ flex: 1 }}
            contentContainerStyle={{ margin: 3 }}
            onEndReached={this.handleListEnd}
            dataProvider={this.state.dataProvider}
            layoutProvider={this.state.layoutProvider}
            rowRenderer={this.rowRenderer}
            renderFooter={this.renderFooter}
            onEndReachedThreshold={300}
            disableRecycling={true}
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
