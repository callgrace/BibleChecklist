import React from "react";
import { TextInput, Animated, View, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressiveRing({
  percentage = 0,
  radius = 28,
  strokeWidth = 6,
  color = "#8BC34A",
  textColor = "#424242",
  max = 100,
  theme = false,
}) {
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const halfCircle = radius + strokeWidth;

  React.useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.setNativeProps({
        text: `${Math.round(percentage)}%`,
      });
    }
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={theme ? "#acacac" : "#e0e0e0"}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity={0.5}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={
          theme
            ? [
                StyleSheet.absoluteFillObject,
                { fontSize: radius / 2.5, color: textColor ?? color },
                styles.textDark,
              ]
            : [
                StyleSheet.absoluteFillObject,
                { fontSize: radius / 2.5, color: textColor ?? color },
                styles.text,
              ]
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: "normal", textAlign: "center", color: "#424242" },
  textDark: { fontWeight: "normal", textAlign: "center", color: "#fff" },
});
