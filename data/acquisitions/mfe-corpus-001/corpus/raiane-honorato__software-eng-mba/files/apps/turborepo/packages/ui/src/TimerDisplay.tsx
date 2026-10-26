import { colors } from "@mygym/theme";
import { formatDuration } from "@mygym/utils";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { AppText } from "./Text";

interface TimerDisplayProps {
  startTime: string;
}

export function TimerDisplay({ startTime }: TimerDisplayProps) {
  const startMs = useRef(new Date(startTime).getTime());
  const [elapsed, setElapsed] = useState(Date.now() - startMs.current);

  useEffect(() => {
    startMs.current = new Date(startTime).getTime();
    const interval = setInterval(() => {
      setElapsed(Date.now() - startMs.current);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <AppText variant="display" style={styles.timer}>
      {formatDuration(elapsed)}
    </AppText>
  );
}

const styles = StyleSheet.create({
  timer: {
    paddingTop: 24,
    color: colors.onSurface,
    fontSize: 52,
    letterSpacing: -2,
  },
});
