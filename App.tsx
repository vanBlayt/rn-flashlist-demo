import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  StatusBar as rnStatusBar,
  unstable_batchedUpdates,
  Dimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useRef, useState } from "react";

const list = new Array(50).fill(0);
const list2 = new Array(50).fill(1);

export default function App() {
  const renderItem = useCallback((item) => {
    console.log("🚀 ~ renderItem ~ item:", `${item.item}-${item.index}`);
    return (
      <View style={{ height: 68 }}>
        <Text>hello world {item.index}</Text>
      </View>
    );
  }, []);

  const [outerScrollEnable, setOuterScrollEnable] = useState(true);
  const [goodsScrollEnable, setGoodsScrollEnable] = useState(true);
  const [recommendScrollEnable, setRecommendScrollEnable] = useState(true);

  const { height } = useWindowDimensions();

  const keyExtractor = useCallback((item, index) => {
    return index;
  }, []);

  // 当商品所有都加载完了，
  // 商品scroll enable= false  outerscrollenable = true；
  const handleGoodsEndReached = useCallback(() => {
    console.log("🚀 ~ handleGoodsEndReached ~ handleGoodsEndReached:");
    // unstable_batchedUpdates(() => {
    //   setOuterScrollEnable(true);
    setGoodsScrollEnable(false);
    // });
  }, []);
  // console.log("-=====", rnStatusBar.currentHeight);
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={outerScrollEnable}
        nestedScrollEnabled
        ref={scrollViewRef}
      >
        {/* <View style={{ height: height, backgroundColor: "#333" }}> */}
        <FlashList
          data={list}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={68}
          // style={{ flex: 1 }}
          scrollEnabled={goodsScrollEnable}
          nestedScrollEnabled
          onEndReached={handleGoodsEndReached}
        />
        {/* </View> */}
        {/* <View style={{ height, backgroundColor: "#fff" }}> */}
        <FlashList
          data={list2}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={68}
          // style={{ flex: 1 }}
          scrollEnabled={recommendScrollEnable}
          nestedScrollEnabled
        />
        {/* </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
