import { Animated, Easing, Platform } from "react-native";
import { BaseItemAnimator } from "recyclerlistview";

const IS_WEB = Platform.OS === "web";

export class MyItemAnimator extends BaseItemAnimator {
  _hasAnimatedOnce = false;
  _isTimerOn = false;

  animateDidMount(atX, atY, itemRef, itemIndex) {
    const viewRef = itemRef;
    viewRef.setNativeProps(this._getNativePropObject(atX, atY + 100, 0));

    let animValue = new Animated.Value(0);
    animValue.addListener(value => {
      if (viewRef._isUnmountedForRecyclerListView) {
        animValue.stopAnimation();
        return;
      }
      let v = value.value;
      viewRef.setNativeProps(
        this._getNativePropObject(atX, atY + (1 - v) * 100, v)
      );
    });

    if (viewRef._lastAnimVal) {
      viewRef._lastAnimVal.stopAnimation();
    }

    viewRef._lastAnimVal = animValue;
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: BaseItemAnimator.USE_NATIVE_DRIVER
    }).start(function() {
      viewRef._lastAnimVal = null;
    });
  }

  animateWillUnmount(atX, atY, itemRef, itemIndex) {
    console.log("animateWillUnmount");
    itemRef._isUnmountedForRecyclerListView = false;

    const viewRef = itemRef;

    let animValue = new Animated.Value(1);
    animValue.addListener(value => {
      if (viewRef._isUnmountedForRecyclerListView) {
        animValue.stopAnimation();
        return;
      }
      let v = value.value;
      console.log(v);
      viewRef.setNativeProps(
        this._getNativePropObject(atX, atY + (1 - v) * 100, v)
      );
    });

    if (viewRef._lastAnimVal) {
      viewRef._lastAnimVal.stopAnimation();
    }

    viewRef._lastAnimVal = animValue;
    Animated.timing(animValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: BaseItemAnimator.USE_NATIVE_DRIVER
    }).start(function() {
      viewRef._lastAnimVal = null;
      itemRef._isUnmountedForRecyclerListView = true;
      console.log("Deleted");
    });
  }

  _getNativePropObject(x, y, o) {
    const point = { left: x, top: y, opacity: o };
    return !IS_WEB ? point : { style: point };
  }
}
