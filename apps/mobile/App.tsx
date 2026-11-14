import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { TimeProvider, useTimeContext, useTimeDispatch } from "@pocket/core/time";
import { SettingsMenuProvider } from "@pocket/core/settings/context/SettingsMenuProvider";
import { TeamColorProvider } from "./src/features/teamsColor/TeamColorProvider";
import { PenaltyTimers } from "./src/features/penaltyTimers/PenaltyTimers";
import { SettingsSheet } from "./src/features/settings/SettingsSheet";
import { TeamColorsSheet } from "./src/features/teamsColor/TeamColorsSheet";
import { Button } from "./src/components/Button";

const GlobalTimeAction = () => {
  const { isTimePaused } = useTimeContext();
  const onPauseTime = useTimeDispatch();

  return (
    <Button style="secondary" active={isTimePaused === true} onPress={onPauseTime}>
      {isTimePaused ? "resume all" : "pause all"}
    </Button>
  );
};

const AppContent = () => {
  const settingsSheetRef = useRef<BottomSheetModal>(null);
  const colorsSheetRef = useRef<BottomSheetModal>(null);

  return (
    <SafeAreaView style={styles.container}>
      <PenaltyTimers />

      <View style={styles.bottomBar}>
        <Button onPress={() => settingsSheetRef.current?.present()}>
          Settings
        </Button>
        <GlobalTimeAction />
        <Button onPress={() => colorsSheetRef.current?.present()}>
          Colors
        </Button>
      </View>

      <BottomSheetModal ref={settingsSheetRef} snapPoints={["50%"]}>
        <BottomSheetView style={styles.sheetContent}>
          <SettingsSheet />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal ref={colorsSheetRef} snapPoints={["50%"]}>
        <BottomSheetView style={styles.sheetContent}>
          <TeamColorsSheet />
        </BottomSheetView>
      </BottomSheetModal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.flexFill}>
      <BottomSheetModalProvider>
        <SettingsMenuProvider>
          <TeamColorProvider>
            <TimeProvider>
              <AppContent />
            </TimeProvider>
          </TeamColorProvider>
        </SettingsMenuProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 12,
  },
  sheetContent: {
    flex: 1,
  },
});
