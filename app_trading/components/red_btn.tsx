import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  GestureResponderEvent 
} from 'react-native';

interface SellButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const SellButton: React.FC<SellButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>Vender</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ef5350', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // Sombra leve para darle profundidad
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default SellButton;