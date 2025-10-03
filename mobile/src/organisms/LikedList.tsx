import React from 'react';
import {FlatList, View, Text, Image, StyleSheet} from 'react-native';
import {User} from '../hooks/useApi';

const LikedList = ({users}: {users: User[]}) => {
  if (users.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You haven't liked anyone yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Image source={{uri: item.pictures[0]?.url}} style={styles.avatar} />
          <Text style={styles.name}>
            {item.name}, {item.age}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {width: 50, height: 50, borderRadius: 25, marginRight: 16},
  name: {fontSize: 18},
});

export default LikedList;