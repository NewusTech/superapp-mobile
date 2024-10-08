import React from "react";
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

import { IconCross } from "../icons";

type ModalSwipeProp = {
  children: React.ReactNode;
  setModalVisible: (value: boolean) => void;
  modalVisible: boolean;
};

export default function ModalSwipe(props: ModalSwipeProp) {
  const { children, setModalVisible, modalVisible } = props;

  const pan = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy > 0 || gestureState.dy < 0; // Tangani swipe ke atas dan ke bawah
    },
    onPanResponderMove: (evt, gestureState) => {
      // Batasi pergerakan ke atas dan ke bawah
      if (gestureState.dy >= 0) {
        pan.setValue({ x: 0, y: gestureState.dy });
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        // Jika swipe cukup jauh, tutup modal
        Animated.timing(pan, {
          toValue: { x: 0, y: 1000 },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setModalVisible(false);
          pan.setValue({ x: 0, y: 0 });
        });
      } else {
        // Jika tidak cukup jauh, kembalikan modal ke posisi semula
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <BlurView
        intensity={100}
        blurReductionFactor={100}
        experimentalBlurMethod="dimezisBlurView"
        style={styles.modalOverlay}
      >
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ width: "auto" }}
          >
            <IconCross size={21} />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "relative", top: -55 }}>
            <View style={styles.modalHandle} />
          </TouchableOpacity>
          <View style={{ paddingVertical: 10 }}>{children}</View>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(20, 21, 17, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHandle: {
    width: "25%",
    height: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
