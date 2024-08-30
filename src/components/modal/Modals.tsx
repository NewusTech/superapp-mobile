import React from "react";
import { Dimensions, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

import { IconCross } from "../icons";
import { View } from "../view/View";

type ModalsProps = {
  children: React.ReactNode;
  setModalVisible: (value: boolean) => void;
  modalVisible: boolean;
};

export default function Modals(props: ModalsProps) {
  const { children, setModalVisible, modalVisible } = props;
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
        <View
          style={{
            width: "auto",
            height: "auto",
            maxHeight: Dimensions.get("window").height - 50,
            borderWidth: 1,
            padding: 10,
            marginHorizontal: 20,
            marginVertical: "auto",
            overflow: "hidden",
            borderRadius: 10,
          }}
          backgroundColor="paper"
          borderColor="outlineborder"
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ width: "auto", marginLeft: "auto" }}
          >
            <IconCross size={21} />
          </TouchableOpacity>
          {children}
        </View>
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
});
