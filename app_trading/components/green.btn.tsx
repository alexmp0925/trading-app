import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  GestureResponderEvent 
} from 'react-native';

interface BuyButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const BuyButton: React.FC<BuyButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>Comprar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#26a69a', // El mismo verde que usas en las velas (upColor)
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

export default BuyButton;