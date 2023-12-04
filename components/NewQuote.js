import { useState } from 'react';
import { Modal, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import BigButton from './BigButton';
import IconButton from './IconButton';

const newQuote = ({ visible, onCancel, onSave }) => {
	const [name, setName] = useState('');
	const [content, setContent] = useState('');

	const saveQuote = () => {
		const newContent = content.trim();
		const newName = name.trim();
		if (newContent.length === 0 || newName.length === 0) {
			alert('Inhalt und Name des Zitats dürfen nicht leer sein.');
			return;
		}
		onSave(newContent, newName);
		setContent('');
		setName('');
	};

	const cancelEdititing = () => {
		onCancel();
		setContent('');
		setName('');
	};

	return (
		<Modal visible={visible} onRequestClose={cancelEdititing} animationType='slide'>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<IconButton onPress={onCancel} icon='arrow-back' style={styles.back} color='black' />
				<TextInput
					onChangeText={setContent}
					multiline={true}
					placeholder='Inhalt'
					style={[styles.input, styles.contentIpnut]}
				/>
				<TextInput
					onChangeText={setName}
					onSubmitEditing={saveQuote}
					returnKeyType='done'
					placeholder='Name'
					style={styles.input}
				/>
				<BigButton title='Speichern' onPress={saveQuote} />
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: 'royalblue',
		borderRadius: 6,
		width: '80%',
		marginBottom: 10,
		padding: 10,
		fontSize: 24,
	},
	contentIpnut: {
		height: 150,
		textAlignVertical: 'top',
	},
	back: {
		position: 'absolute',
		top: 40,
		left: 20,
	},
});

export default newQuote;
