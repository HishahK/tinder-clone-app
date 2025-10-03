import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwiperDeck from '../organisms/SwiperDeck';
import {useRecommendations} from '../hooks/useApi';
import LoadingSpinner from '../atoms/LoadingSpinner';

const MainScreen = () => {
  const {data, fetchNextPage, hasNextPage, isLoading, isError, error} = useRecommendations();

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

  const users = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      {users.length > 0 ? (
        <SwiperDeck
          users={users}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
        />
      ) : (
        <View style={styles.center}>
          <Text>No more profiles.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f0f0f0'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default MainScreen;