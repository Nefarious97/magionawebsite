import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.12, duration: 1200, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();

    // 4.5 Seconds Timer to Login Screen
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { transform: [{ scale: scaleAnim }] }]}>
        <Image 
          source={{ uri: 'https://raw.githubusercontent.com/Nefarious97/magionawebsite/main/image/Logo%20m%202.png' }} 
          style={styles.logoImg} 
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.title}>Mangiona Partner</Text>
      <Text style={styles.subtitle}>Fast Food Delivery Management for Restaurants</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#01281b', alignItems: 'center', justifyContent: 'center', padding: 24 },
  logoWrap: { width: 100, height: 100, borderRadius: 32, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 24, elevation: 8 },
  logoImg: { width: 68, height: 68 },
  title: { fontSize: 32, fontWeight: '850', color: '#FFFFFF', letterSpacing: -1, marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#A7F3D0', textAlign: 'center', lineHeight: 18, maxWidth: 260 }
});
