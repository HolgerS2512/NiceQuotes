import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import Firebase from './Firebase';
// import * as SQLite from 'expo-sqlite';
import BigButton from './components/BigButton';
import Quote from './components/Quote';
import NewQuote from './components/NewQuote';
import IconButton from './components/IconButton';

// const database = SQLite.openDatabase('quotes.db');

export default function App() {
	const [index, setIndex] = useState(0);
	const [quotes, setQuotes] = useState([]);
	const [showNewDialog, setShowNewDialog] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		// initSQLiteDB();
		Firebase.init();
		loadQuotes();
	}, []); // [] --> einmalige Ausführung

	const initSQLiteDB = () => {
		database.transaction((tx) =>
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY NOT NULL, text TEXT, author VARCHAR(50));'
			)
		);
	};

	const addQuoteToList = (text, author) => {
		setShowNewDialog(false);
		const newQuotes = [...quotes, { text, author }];
		setQuotes(newQuotes);
		setIndex(newQuotes.length - 1);
		saveQuotes(text, author, newQuotes);
	};

	const removeQuoateFromList = () => {
		const newQuotes = [...quotes];
		const id = quotes[index].id;
		newQuotes.splice(index, 1);
		setIndex(0);
		setQuotes(newQuotes);
		Firebase.destroy(id);
		// database.transaction((tx) => tx.executeSql('DELETE FROM quotes WHERE id=?', [id]));
	};

	const deleteQuote = () => {
		Alert.alert('Zitat löschen', 'Soll dieses Zitat wirklich gelöscht werden?', [
			{ text: 'Abbrechen', style: 'cancel' },
			{ text: 'Bestätigen', style: 'destructive', onPress: removeQuoateFromList },
		]);
	};

	const saveQuotes = async (text, author, newQuotes) => {
		const id = await Firebase.save(text, author);
		newQuotes[newQuotes.length - 1].id = id;
		setQuotes(newQuotes);
		// database.transaction((tx) =>
		// 	tx.executeSql('INSERT INTO quotes (text, author) VALUES (?, ?)', [text, author], (_, result) => {
		// 		newQuotes[newQuotes.length - 1].id = result.insertId;
		// 		setQuotes(newQuotes);
		// 	})
		// );
	};

	const loadQuotes = async () => {
		const quotesFromDB = await Firebase.get();
		setQuotes(quotesFromDB);
		setLoading(false);
		// database.transaction((tx) =>
		// 	tx.executeSql('SELECT * FROM quotes', [], (_, result) => {
		// 		setQuotes(result.rows._array);
		// 	})
		// );
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size='large' color='royalblue' />
			</View>
		);
	}

	let content = <Text style={styles.noQuotes}>Keine Zitate vorhanden</Text>;
	if (quotes.length > 0) {
		const quote = quotes[index];
		content = <Quote text={quote.text} author={quote.author} />;
	}

	return (
		<View style={styles.container}>
			{quotes.length > 0 && (
				<IconButton onPress={deleteQuote} icon='delete-forever' style={styles.delete} color='red' />
			)}
			<IconButton onPress={() => setShowNewDialog(true)} icon='add-circle' style={styles.new} color='limegreen' />
			<NewQuote onSave={addQuoteToList} visible={showNewDialog} onCancel={() => setShowNewDialog(false)} />
			{content}
			{quotes.length >= 2 && (
				<BigButton style={styles.next} title='Nächstes Zitat' onPress={() => setIndex((index + 1) % quotes.length)} />
			)}
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	next: {
		position: 'absolute',
		bottom: 60,
	},
	new: {
		position: 'absolute',
		top: 30,
		right: 15,
		padding: 18,
	},
	delete: {
		position: 'absolute',
		top: 30,
		left: 10,
		padding: 18,
	},
	noQuotes: {
		fontSize: 24,
		fontWeight: '300',
	},
});
