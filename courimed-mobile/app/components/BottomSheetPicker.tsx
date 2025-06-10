import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Modal,
    FlatList,
    Pressable,
    StyleSheet,
    TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@constants/colors';

interface BottomSheetPickerProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  required?: boolean;
  valueStyle?: TextStyle;
}

export default function BottomSheetPicker({
    label,
    value,
    options,
    onSelect,
    required = false,
    valueStyle = {},
}: BottomSheetPickerProps) {
    const [visible, setVisible] = React.useState(false);

     return (
    <>
      <Text style={styles.label}>{label} {required && <Text style={styles.requiredAsterisk}>*</Text>}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text
          style={[
            styles.dropdownText,
            !value ? styles.placeholderText : null,
            valueStyle,
          ]}
        >
          {value || `Select ${label.toLowerCase()}...`}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={colors.neutral[500]}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.bottomSheet} onPress={() => {}}>
            <Text style={styles.sheetTitle}>Select {label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: colors.neutral[800],
    marginBottom: 6,
  },
  requiredAsterisk: {
    color: 'red',
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.neutral[500],
    backgroundColor: colors.shades.white,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
  },
  placeholderText: {
    color: colors.neutral[500],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomSheet: {
    backgroundColor: colors.shades.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
  },
  sheetTitle: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: colors.neutral[900],
    marginBottom: 12,
  },
  option: {
    paddingVertical: 14,
    borderBottomColor: colors.neutral[200],
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.neutral[900],
  },
});