import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import {useLiked} from '../hooks/useApi';
import LikedList from '../organisms/LikedList';
import LoadingSpinner from '../atoms/LoadingSpinner';

const LikedScreen = () => {
  const {data, isLoading, isError, error} = useLiked();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Liked Profiles</Text>
      <LikedList users={data ?? []} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {fontSize: 24, fontWeight: 'bold', padding: 16},
});

export default LikedScreen;