import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { RootState } from '../store/store';
import { toggleLike, addComment } from '../store/slices/postsSlice';
import { Post } from '../types/post';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import navigation type
import { RootStackParamList } from '../navigation/AppNavigator'; // Import RootStackParamList

interface PostCardProps {
  post: Post;
}

// Define navigation prop type
type PostCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Feed' // Assuming PostCard is used in FeedScreen
>;

export default function PostCard({ post }: PostCardProps) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const navigation = useNavigation<PostCardNavigationProp>(); // Use the hook

  const handleLike = () => {
    if (userId) {
      dispatch(toggleLike({ postId: post.id, userId }));
    }
  };

  const handleComment = () => {
    if (userId && comment.trim()) {
      dispatch(addComment({
        postId: post.id,
        comment: {
          id: Date.now().toString(),
          userId,
          username: 'User',
          text: comment,
          timestamp: Date.now(),
        },
      }));
      setComment('');
    }
  };

  const handleNavigateToProfile = () => {
    // Navigate to ProfileScreen, potentially passing the post's userId
    // For now, just navigate to the generic Profile screen
    // Later, ProfileScreen can be updated to accept userId param
    navigation.navigate('Profile', { userId: post.userId });
  };

  const isLiked = userId ? post.likes.includes(userId) : false;

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleNavigateToProfile}> 
        <Card.Title title={post.username} />
      </TouchableOpacity>
      <Card.Cover source={{ uri: post.imageUrl }} />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.caption}>{post.caption}</Text>
        <View style={styles.interactions}>
          <Button
            icon={isLiked ? 'heart' : 'heart-outline'}
            onPress={handleLike}
            mode={isLiked ? 'contained' : 'outlined'}
          >
            {post.likes.length}
          </Button>
          <Text style={styles.comments}>{post.comments.length} comments</Text>
        </View>
        <View style={styles.commentSection}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            style={styles.commentInput}
            right={<TextInput.Icon icon="send" onPress={handleComment} />}
          />
        </View>
        {post.comments.slice(-2).map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentUsername}>{comment.username}</Text>
            <Text>{comment.text}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  caption: {
    marginVertical: 8,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  comments: {
    marginLeft: 16,
  },
  commentSection: {
    marginTop: 8,
  },
  commentInput: {
    backgroundColor: 'transparent',
  },
  comment: {
    marginTop: 8,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
});