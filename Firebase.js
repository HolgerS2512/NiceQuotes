import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

// Testcloud valid for a maximum of 30 days
const firebaseConfig = {
	apiKey: 'AIzaSyAAgLjFOe-FQkSyZgaN6p3xkiO0FrDW0_0',
	authDomain: 'nqtest-62c2a.firebaseapp.com',
	projectId: 'nqtest-62c2a',
	storageBucket: 'nqtest-62c2a.appspot.com',
	messagingSenderId: '1066310822265',
	appId: '1:1066310822265:web:29081a6d059e444286e7a8',
};

export default class Firebase {
	static db;

	static init() {
		const app = initializeApp(firebaseConfig);
		Firebase.db = getFirestore(app);
	}

	static async save(text, author) {
		const docRef = await addDoc(collection(Firebase.db, 'quotes'), { text, author });
		return docRef.id;
	}

	static async get() {
		const quotes = [];
		const querySnapshot = await getDocs(collection(Firebase.db, 'quotes'));
		querySnapshot.forEach((quote) => {
			quotes.push({
				id: quote.id,
				text: quote.data().text,
				author: quote.data().author,
			});
		});
		return quotes;
	}

  static destroy(id) {
    deleteDoc(doc(Firebase.db, 'quotes', id));
  }
}
