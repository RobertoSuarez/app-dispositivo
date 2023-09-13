import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const Temperatura = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Mas datos de la temperatura</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
