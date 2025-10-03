import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRegister } from '../hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../state/user';

const SignupScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    password: '',
  });
  const setUser = useSetRecoilState(currentUserState);
  const registerMutation = useRegister();

  const handleSubmit = () => {
    registerMutation.mutate(
      { ...form, age: Number(form.age) },
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
      <TextInput placeholder="Name" value={form.name} onChangeText={text => setForm({ ...form, name: text })} style={styles.input} />
      <TextInput placeholder="Age" value={form.age} onChangeText={text => setForm({ ...form, age: text })} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Email" value={form.email} onChangeText={text => setForm({ ...form, email: text })} style={styles.input} />
      <TextInput placeholder="Phone" value={form.phone} onChangeText={text => setForm({ ...form, phone: text })} style={styles.input} />
      <TextInput placeholder="Password" value={form.password} onChangeText={text => setForm({ ...form, password: text })} style={styles.input} secureTextEntry />
      <Button title="Register" onPress={handleSubmit} />
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
});

export default SignupScreen;
