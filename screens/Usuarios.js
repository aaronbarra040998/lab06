import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../database/firebase';
import * as ImagePicker from 'expo-image-picker'; // Importa la librería para elegir imágenes

export default function Usuarios({
  id,
  email,
  name,
  phone,
  likes,
  profileImage // Agregamos la propiedad de imagen de perfil
}) {
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada
  const imagePickerRef = useRef(null); // Referencia para el componente ImagePicker

  const handleLike = async () => {
    if (!liked) {
      try {
        const userRef = doc(database, 'usuarios', id);
        await updateDoc(userRef, {
          likes: likes + 1
        });
        setLiked(true);
      } catch (error) {
        console.error('Error al actualizar el contador de "Me gusta":', error);
      }
    }
  };

  const handleImagePick = async () => {
    // Verifica si la plataforma es iOS o Android para manejar los permisos de la cámara y la galería
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería de imágenes.');
        return;
      }
    }

    // Abre la galería de imágenes para que el usuario elija una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri); // Almacena la imagen seleccionada
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity
          onPress={handleImagePick} // Permite al usuario elegir una imagen de perfil
          ref={imagePickerRef}
        >
          <Image source={{ uri: selectedImage || profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <View>
          <Text style={styles.name}>Nombre: {name}</Text>
          <Text style={styles.email}>Email: {email}</Text>
          <Text style={styles.phone}>Teléfono: {phone}</Text>
        </View>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <Text style={liked ? styles.likedText : styles.likeText}>
            {liked ? 'IMG' : 'IMG'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.likesCount}>{likes} Comentarios</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  likeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  likeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  likedText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
  },
  likesCount: {
    fontSize: 14,
    color: '#555',
  },
});
