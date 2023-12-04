import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

const IconButton = ({ onPress, icon, style, color }) => {
	return (
		<Pressable onPress={onPress} style={style}>
			<MaterialIcons name={icon} size={36} color={color} />
		</Pressable>
	);
};

export default IconButton;
