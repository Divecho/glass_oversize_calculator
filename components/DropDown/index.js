import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const Dropdown = ({ options, onSelectOption }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option) => {
    onSelectOption(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownButton}>Mode</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {options.map((option) => (
              <TouchableOpacity
                style={styles.optionButton}
                key={option}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  dropdownButton: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    maxHeight: 300,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dropdown;
