import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '@constants/colors';

interface CustomAlertProps {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isVisible, title, message, onConfirm }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onConfirm}
      onBackButtonPress={onConfirm}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.modal}
    >
      <View style={styles.alertContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: colors.shades.white,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_700Bold',
    color: colors.neutral[900],
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: colors.shades.white,
  },
});

export default CustomAlert;