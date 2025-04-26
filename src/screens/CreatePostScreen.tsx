import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Surface, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/slices/postsSlice';
import { RootState } from '../store/store';

export default function CreatePostScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (image && caption && user) {
      dispatch(addPost({
        id: Date.now().toString(),
        userId: user.id,
        username: user.username,
        imageUrl: image,
        caption,
        likes: [],
        comments: [],
        timestamp: Date.now(),
      }));
      navigation.goBack();
    }
  };

  return (
    <Surface style={styles.container}>
      <Button
        mode="outlined"
        onPress={pickImage}
        style={styles.imageButton}
      >
        {image ? 'Change Image' : 'Pick an image'}
      </Button>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <TextInput
        label="Caption"
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
        multiline
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handlePost}
        disabled={!image || !caption}
        style={styles.postButton}
      >
        Post
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageButton: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 20,
  },
  postButton: {
    marginTop: 10,
  },
});