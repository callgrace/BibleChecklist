import React from "react";
import { TextInput, Animated, View, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function TotalProgressRing({
  percentage = 0,
  radius = 60,
  strokeWidth = 9,
  color = "#8BC34A",
  textColor = "#424242",
  theme = false,
}) {
  // const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const halfCircle = radius + strokeWidth;

  // const animation = (toValue) => {
  //   return Animated.timing(animated, {
  //     delay: 10000,
  //     toValue,
  //     duration,
  //     useNativeDriver: true,
  //     easing: Easing.out(Easing.ease),
  //   }).start(() => {
  //     animation(toValue === 0 ? percentage : 0);
  //   });
  // };

  React.useEffect(() => {
    // animation(percentage);
    // animated.addListener(
    //   (v) => {
    // const maxPerc = (100 * v.value) / max;
    if (inputRef?.current) {
      inputRef.current.setNativeProps({
        text: `${Math.round(percentage)}%`,
      });
    }
    //   if (circleRef?.current) {
    //     circleRef.current.setNativeProps({
    //       strokeDashoffset,
    //     });
    //   }
    //}
    // [max, percentage]
    //);
    //   return () => {
    //     animated.removeAllListeners();
    //   };
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
            // stroke="#E8E8E8"
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
                { fontSize: radius / 2.3, color: textColor ?? color },
                styles.textDark,
              ]
            : [
                StyleSheet.absoluteFillObject,
                { fontSize: radius / 2.3, color: textColor ?? color },
                styles.text,
              ]
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: "500", textAlign: "center", color: "#343434" },
  textDark: { fontWeight: "normal", textAlign: "center", color: "#fff" },
});
