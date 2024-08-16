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
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={styles.modalHandle} />
          </TouchableOpacity>
          <View style={{ paddingVertical: 10 }}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
  },
  modalHandle: {
    width: "25%",
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 10,
  },
});
