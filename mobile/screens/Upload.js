import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/uploadStyles';
import * as ImagePicker from 'expo-image-picker';
import { API } from '../services/api';
import { Picker } from '@react-native-picker/picker';

export default function Upload() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);

  // Fetch recent uploads
  const fetchRecentUploads = async () => {
    try {
      const response = await API.get('/receipt/recent');
      setRecentUploads(response.data);
    } catch (error) {
      console.error('Error fetching recent uploads:', error);
    }
  };

  // Upload file to server
  const uploadToServer = async (uri) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('file', {
        uri: uri,
        name: `receipt.${fileType}`,
        type: `image/${fileType}`
      });

      formData.append('category', selectedCategory);

      const response = await API.post('/receipt/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Receipt uploaded successfully!');
        await fetchRecentUploads();
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.detail || 'Failed to upload receipt'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need gallery permissions to upload photos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      await uploadToServer(result.assets[0].uri);
    }
  };

  // Take photo using camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera permissions to take photos!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      await uploadToServer(result.assets[0].uri);
    }
  };

  // Show upload options
  const handleUpload = () => {
    Alert.alert(
      'Upload Receipt',
      'Choose how you want to upload your receipt',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = (id) => {
    console.log('Delete pressed for id:', id);
    // TODO: Add delete API logic here
  };

  useEffect(() => {
    fetchRecentUploads();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Receipt Upload</Text>
          <Text style={styles.subtitle}>
            Kindly upload your receipts in the section below.
          </Text>
        </View>

        {/* Upload Card */}
        <View style={styles.uploadCard}>
          {/* Category Picker */}
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={{ marginBottom: 15 }}
          >
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="General" value="general" />
            <Picker.Item label="Shopping" value="shopping" />
            <Picker.Item label="Others" value="others" />
          </Picker>

          <TouchableOpacity
            style={styles.uploadArea}
            onPress={handleUpload}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#2FAF7B" />
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={56} color="#2FAF7B" />
                </View>
                <Text style={styles.uploadText}>Choose a file or upload an image</Text>
                <Text style={styles.uploadHint}>
                  Select a document or take a photo{'\n'}of the receipt you want to upload
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Recent Uploads */}
        <Text style={styles.sectionTitle}>Recent Upload</Text>
        <View style={styles.recentList}>
          {recentUploads.length > 0 ? (
            recentUploads.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.receiptItem,
                  index === recentUploads.length - 1 && styles.receiptItemLast,
                ]}
              >
                <View style={styles.receiptIcon}>
                  <Ionicons name="image-outline" size={24} color="#2FAF7B" />
                </View>
                <View style={styles.receiptInfo}>
                  <Text style={styles.receiptTitle}>{item.name}</Text>
                  <Text style={styles.receiptMeta}>
                    {item.size} as of {item.date}
                  </Text>
                </View>
                <View style={styles.receiptActions}>
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'success'
                        ? styles.statusSuccess
                        : styles.statusPending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        item.status === 'success'
                          ? styles.statusTextSuccess
                          : styles.statusTextPending,
                      ]}
                    >
                      ✓ Success
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={48} color="#D4E8DC" />
              <Text style={styles.emptyText}>
                No receipts uploaded yet.{'\n'}Upload your first receipt above!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
