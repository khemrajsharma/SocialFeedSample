import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Text, Button, useTheme} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'; // Import useRoute and RouteProp
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import PostCard from '../components/PostCard';
import { RootStackParamList } from '../navigation/AppNavigator'; // Import RootStackParamList

// Define the route prop type for ProfileScreen
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>(); // Use useRoute hook
  const dispatch = useDispatch();
  const theme = useTheme();
  // Get the userId from route params, default to logged-in user's ID if not provided
  const profileUserId = route.params?.userId;
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const targetUserId = profileUserId || loggedInUser?.id;

  // Find the user data for the target profile (this might need adjustment based on how users are stored)
  // For now, assuming we only have the logged-in user's data easily accessible
  // A real app would fetch user data based on targetUserId
  const user = useSelector((state: RootState) => {
    
    if (targetUserId === loggedInUser?.id) {
      return loggedInUser;
    }
    // Placeholder: In a real app, fetch user data for targetUserId
    // For this example, we'll just show a generic user if it's not the logged-in user
    // Or potentially find the user from the posts data if available
    
    const postUser = state.posts.posts.find(p => p.userId === targetUserId);
  
    return postUser ? { id: postUser.userId, username: postUser.username, avatar: 'https://picsum.photos/200' } : loggedInUser;
  });

  const posts = useSelector((state: RootState) =>
    state.posts.posts.filter(post => post.userId === targetUserId)
  );

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // Only show logout button if viewing own profile
  const isOwnProfile = targetUserId === loggedInUser?.id;

  return (
    
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
    
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: user?.avatar || 'https://picsum.photos/200' }}
        />
        <Text variant="headlineSmall" style={styles.username}>
          {user?.username}
        </Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text variant="titleLarge">{posts.length}</Text>
            <Text variant="bodyMedium">Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text variant="titleLarge">0</Text>
            <Text variant="bodyMedium">Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text variant="titleLarge">0</Text>
            <Text variant="bodyMedium">Following</Text>
          </View>
        </View>
        {isOwnProfile && (
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        )}
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  username: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    width: '50%',
  },
});