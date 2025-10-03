import React from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {User, useSwipe} from '../hooks/useApi';
import ProfileCard from '../molecules/ProfileCard';

interface SwiperDeckProps {
  users: User[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const SwiperDeck = ({users, fetchNextPage, hasNextPage}: SwiperDeckProps) => {
  const swipeMutation = useSwipe();

  const handleSwipe = (index: number, action: 'like' | 'nope') => {
    const user = users[index];
    if (user) {
      swipeMutation.mutate({swipedId: user.id, action});
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={users}
        renderCard={user => <ProfileCard user={user} />}
        onSwipedLeft={cardIndex => handleSwipe(cardIndex, 'nope')}
        onSwipedRight={cardIndex => handleSwipe(cardIndex, 'like')}
        onSwipedAll={() => {
          if (hasNextPage) fetchNextPage();
        }}
        cardIndex={0}
        backgroundColor={'#f0f0f0'}
        stackSize={3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        verticalSwipe={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default SwiperDeck;