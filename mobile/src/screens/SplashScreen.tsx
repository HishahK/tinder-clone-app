import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('App');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TinderClone</Text>
      <ActivityIndicator size="large" color="#FF6B6B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'},
  title: {fontSize: 32, fontWeight: 'bold', color: '#FF6B6B', marginBottom: 20},
});

export default SplashScreen;