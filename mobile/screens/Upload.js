import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/uploadStyles';

export default function Upload() {
  const [recentUploads] = useState([
    {
      id: 1,
      name: 'October Electricity Bill.png',
      size: '1820 KB',
      date: 'Oct 15, 2024',
      status: 'success',
    },
    {
      id: 2,
      name: 'October Electricity Bill.png',
      size: '1820 KB',
      date: 'Oct 15, 2024',
      status: 'success',
    },
    {
      id: 3,
      name: 'October Electricity Bill.png',
      size: '1820 KB',
      date: 'Oct 15, 2024',
      status: 'success',
    },
    {
      id: 4,
      name: 'October Electricity Bill.png',
      size: '1820 KB',
      date: 'Oct 15, 2024',
      status: 'success',
    },
    {
      id: 5,
      name: 'October Electricity Bill.png',
      size: '1820 KB',
      date: 'Oct 15, 2024',
      status: 'success',
    },
  ]);

  const handleUpload = () => {
    // Handle file upload logic
    console.log('Upload pressed');
  };

  const handleDelete = (id) => {
    // Handle delete logic
    console.log('Delete pressed for id:', id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Receipt Upload</Text>
          <Text style={styles.subtitle}>
            Kindly upload your receipts in the section below.
          </Text>
        </View>

        {/* Upload Card */}
        <View style={styles.uploadCard}>
          <TouchableOpacity 
            style={styles.uploadArea}
            onPress={handleUpload}
            activeOpacity={0.7}
          >
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={56} color="#2FAF7B" />
            </View>
            <Text style={styles.uploadText}>
              Choose a file or upload an image
            </Text>
            <Text style={styles.uploadHint}>
              Select a document or{'\n'}take a photo of the bill you{'\n'}want to upload
            </Text>
            <Text style={styles.supportedFormats}>
              October Electricity Bill.png
            </Text>
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