import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useLogin } from '../hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../state/user';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const setUser = useSetRecoilState(currentUserState);

  const handleSubmit = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: data => {
          setUser({ id: data.id, name: data.name, token: data.token });
          navigation.replace('Main');
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleSubmit} />
      <Text onPress={() => navigation.navigate('Signup')}>Don’t have an account? Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
});

export default LoginScreen;
