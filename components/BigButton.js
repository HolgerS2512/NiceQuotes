import { Pressable, StyleSheet, Text } from 'react-native';

const BigButton = ({ onPress, title, style }) => {
	return (
		<Pressable style={[styles.btn, style]} onPress={onPress}>
			<Text style={styles.title}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
  btn: {
		padding: 18,
		borderWidth: 1,
		borderRadius: 6,
		borderColor: 'slateblue',
		backgroundColor: 'royalblue',
  },
  title: {
    color: 'white',
		fontSize: 18,
  },
});

export default BigButton;
