import { Button, Text, View } from "react-native";

export const MyButton = () => {
  const saludar = () => {
    console.log("Hola, mundo");
  };
  return (
    <View>
      <Text>Soy un boton</Text>
      <Button onPress={saludar} title="hola" />
    </View>
  );
};
