import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { database } from '../database/firebase';
import {
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';
import Usuarios from './Usuarios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, 'usuarios');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          phone: doc.data().phone
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {users.map((usuario) => (
        <Usuarios key={usuario.id} {...usuario} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default UserList;
