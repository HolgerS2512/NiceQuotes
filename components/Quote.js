import { Text, StyleSheet, View } from "react-native";

const Quote = ({author, text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author} &mdash;</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 27,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  author: {
    fontSize: 20,
    textAlign: 'right',
  }
});

export default Quote;