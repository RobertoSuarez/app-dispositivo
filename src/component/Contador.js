import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export const Contador = ({ counter, label }) => {
  const [value, setValue] = useState(counter);
  useEffect(() => {
    setInterval(() => {
      let numero = Math.round(Math.random() * 100);
      setValue(numero);
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C356A",
    shadowColor: "black",
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: "100%",
  },
  value: {
    fontSize: 48,
    color: "white",
  },
  label: {
    color: "white",
  },
});
