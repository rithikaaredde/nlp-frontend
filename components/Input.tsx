import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { palette } from '../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  secure?: boolean;
  helperText?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  secure = false,
  helperText,
  error,
  style,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(secure);

  const renderAccessory = () => {
    if (!secure) return null;
    return (
      <TouchableOpacity onPress={() => setIsSecure(prev => !prev)}>
        <Text style={styles.accessory}>{isSecure ? 'Show' : 'Hide'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          placeholderTextColor={palette.neutral400}
          secureTextEntry={isSecure}
          style={styles.input}
          {...rest}
        />
        {renderAccessory()}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!error && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.neutral700,
    marginBottom: 8
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: palette.neutral200,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: palette.neutral900
  },
  accessory: {
    marginLeft: 12,
    color: palette.sky,
    fontWeight: '600'
  },
  error: {
    marginTop: 6,
    color: palette.danger,
    fontSize: 12
  },
  helper: {
    marginTop: 6,
    color: palette.neutral500,
    fontSize: 12
  },
  inputError: {
    borderColor: palette.danger
  }
});

export default Input;
