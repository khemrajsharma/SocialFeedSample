import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FAB, IconButton, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { RootStackParamList } from '../navigation/AppNavigator';
import { setLoading, setPosts } from '../store/slices/postsSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import { RootState } from '../store/store';

// Generate dummy data
const generateDummyPosts = (startIndex: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${startIndex + i}`,
    userId: `${startIndex + i}`,
    username: 'user' + (startIndex + i),
    imageUrl: `https://picsum.photos/500/500?random=${startIndex + i}`,
    caption: `This is post ${startIndex + i}`,
    likes: [],
    comments: [],
    timestamp: Date.now() - (startIndex + i) * 1000000,
  }));
};

export default function FeedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [page, setPage] = useState(1);
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={isDarkMode ? 'weather-night' : 'weather-sunny'}
          size={24}
          onPress={handleToggleTheme}
          iconColor="#fff"
        />
      ),
    });
  }, [navigation, isDarkMode]);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = () => {
    dispatch(setLoading(true));
    const initialPosts = generateDummyPosts(0, 10);
    dispatch(setPosts(initialPosts));
    dispatch(setLoading(false));
  };

  const loadMorePosts = () => {
    if (!loading) {
      dispatch(setLoading(true));
      const newPosts = generateDummyPosts(page * 10, 10);
      dispatch(setPosts([...posts, ...newPosts]));
      setPage(page + 1);
      dispatch(setLoading(false));
    }
  };

  return (
    <Surface style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});