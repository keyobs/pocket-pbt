import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type TBadge = {
  jammerId: "jammer1" | "jammer2";
};

const StarBadge = ({ jammerId }: TBadge) => {
  return (
    <View testID={`badge-${jammerId}`} style={styles.badge}>
      <Feather name="star" size={22} color="#d3b605" />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -10,
    right: -10,
  },
});

export default StarBadge;
