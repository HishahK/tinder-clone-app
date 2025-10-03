import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useApiClient } from '../api/client';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../state/user';

const ProfileScreen = () => {
  const user = useRecoilValue(currentUserState);
  const [biography, setBiography] = useState('');
  const [pictures, setPictures] = useState<any[]>([]);
  const client = useApiClient();

  const updateProfile = async () => {
    const form = new FormData();
    form.append('biography', biography);
    pictures.forEach((pic, index) => {
      form.append('pictures[]', {
        uri: pic.uri,
        type: pic.type,
        name: `photo-${index}.jpg`,
      } as any);
    });
    const response = await client.put('/profile', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  };

  const mutation = useMutation({ mutationFn: updateProfile });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setPictures(result.assets);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={biography} onChangeText={setBiography} style={styles.input} placeholder="Biography" multiline />
      <Button title="Pick images" onPress={pickImage} />
      <FlatList data={pictures} keyExtractor={(_, i) => i.toString()} horizontal renderItem={({ item }) => <Image source={{ uri: item.uri }} style={styles.image} />} />
      <Button title="Update" onPress={() => mutation.mutate()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 12, borderRadius: 4 },
  image: { width: 80, height: 80, marginRight: 8, borderRadius: 8 },
});

export default ProfileScreen;
