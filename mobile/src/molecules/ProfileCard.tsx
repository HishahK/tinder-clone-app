import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Card from '../atoms/Card';
import {User} from '../hooks/useApi';

const {height} = Dimensions.get('window');

const ProfileCard = ({user}: {user: User}) => {
  return (
    <Card style={styles.container}>
      <Image
        source={{uri: user.pictures[0]?.url || 'https://via.placeholder.com/400x600'}}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>
          {user.name}, {user.age}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {height: height * 0.7, borderRadius: 10, overflow: 'hidden'},
  image: {width: '100%', height: '100%'},
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  name: {color: 'white', fontSize: 28, fontWeight: 'bold'},
});

export default ProfileCard;