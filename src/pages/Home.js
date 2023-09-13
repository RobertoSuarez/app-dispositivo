import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import AnimateNumber from "react-native-animate-number";
import * as NavigationBar from "expo-navigation-bar";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./../firebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Thermometer = (props) => <Avatar.Icon {...props} icon="thermometer" />;
const WaterPercent = (props) => <Avatar.Icon {...props} icon="water-percent" />;
const ph = (props) => <Avatar.Icon {...props} icon="ph" />;
const Salinidad = (props) => <Avatar.Icon {...props} icon="shaker-outline" />;

const ACCESS_KEY = "";

// determina como la aplicación administra las notificaciones.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [sensores, setSensores] = useState({
    temperatura: 10,
    humedad: 10,
    ph: 11,
    salinidad: 11,
  });

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("black");
    const docRef = doc(db, "dispositivos", "disp1");
    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        let data = doc.data();
        setSensores(data);
      } else {
        console.log("No se ha registrado el dispositivos");
      }
    });

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log(notification);
        console.log(notification.request.content.data);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        console.log(response);
      });

    return () => {
      unsub();
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const press = () => {
    navigation.navigate("temperatura");
  };

  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <StatusBar style="light" backgroundColor="black" />
      <ImageBackground
        source={require("../img/back.webp")}
        style={{ ...styles.image }}
      >
        <View style={{ marginHorizontal: 12, marginTop: 16 }}>
          <Text variant="headlineLarge">App IoT</Text>
          <Text variant="titleSmall" style={{ color: "gray" }}>
            Monitorea los niveles
          </Text>
        </View>
        <ScrollView style={styles.containerSensores}>
          <Card style={styles.card} onPress={press}>
            <Card.Title title="Temperatura" left={Thermometer} />
            <Card.Content style={styles.cardContent}>
              <AnimateNumber
                style={{ fontSize: 34 }}
                value={sensores.temperatura}
                countBy={1}
                timing={(interval, progress) => {
                  // slow start, slow end
                  return interval * (1 - Math.sin(Math.PI * progress)) * 10;
                }}
                formatter={(val) => val + `°C`}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Humedad" left={WaterPercent} />
            <Card.Content style={styles.cardContent}>
              <AnimateNumber
                style={{ fontSize: 34 }}
                value={sensores.humedad}
                countBy={1}
                timing={(interval, progress) => {
                  // slow start, slow end
                  return interval * (1 - Math.sin(Math.PI * progress)) * 10;
                }}
                formatter={(val) => val + `%`}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="PH" left={ph} />
            <Card.Content style={styles.cardContent}>
              <AnimateNumber
                style={{ fontSize: 34 }}
                value={sensores.ph}
                countBy={1}
                timing={(interval, progress) => {
                  // slow start, slow end
                  return interval * (1 - Math.sin(Math.PI * progress)) * 10;
                }}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Salinidad" left={Salinidad} />
            <Card.Content style={styles.cardContent}>
              <AnimateNumber
                style={{ fontSize: 34 }}
                value={sensores.salinidad}
                countBy={1}
                timing={(interval, progress) => {
                  // slow start, slow end
                  return interval * (1 - Math.sin(Math.PI * progress)) * 10;
                }}
              />
            </Card.Content>
          </Card>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    marginVertical: 16,
    marginLeft: 16,
  },
  containerSensores: {
    paddingTop: 12,
    display: "flex",
    flexDirection: "column",
  },
  image: { flex: 1, resizeMode: "cover" },
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    justifyContent: "center",
  },
  cardContent: {
    alignItems: "center",
  },
  contadores: {
    flex: 1,
    display: "flex",
    gap: 16,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 36,
  },
});
