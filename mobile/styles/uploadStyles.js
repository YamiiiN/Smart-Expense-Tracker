import { StyleSheet, Platform } from 'react-native';

// Using the same Forest-Modern theme from CommonStyles.js
const THEME = {
  primaryA: '#175C3A', // deep forest green
  primaryB: '#2FAF7B', // fresh green
  accent: '#FFB703', // golden yellow
  calmBlue: '#3BA7E6',
  bgSoft: '#F6FFF8',
  card: '#FFFFFF',
  text: '#08121A',
  muted: '#6B7A78',
  success: '#38B000',
  error: '#FF6B6B',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F8EE',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2F3E46',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: THEME.muted,
    lineHeight: 20,
  },

  uploadCard: {
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },

  uploadArea: {
    borderWidth: 2,
    borderColor: '#D4E8DC',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFFFE',
    marginBottom: 15,
  },

  uploadIcon: {
    marginBottom: 15,
  },

  uploadText: {
    fontSize: 15,
    color: THEME.text,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },

  uploadHint: {
    fontSize: 13,
    color: THEME.muted,
    textAlign: 'center',
    lineHeight: 18,
  },

  supportedFormats: {
    fontSize: 12,
    color: THEME.muted,
    textAlign: 'center',
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F3E46',
    marginBottom: 15,
  },

  recentList: {
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },

  receiptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF6F0',
  },

  receiptItemLast: {
    borderBottomWidth: 0,
  },

  receiptIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#E9F8EE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  receiptInfo: {
    flex: 1,
  },

  receiptTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2F3E46',
    marginBottom: 4,
  },

  receiptMeta: {
    fontSize: 12,
    color: THEME.muted,
  },

  receiptActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },

  statusSuccess: {
    backgroundColor: '#E6F9E6',
  },

  statusPending: {
    backgroundColor: '#FFF4E6',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  statusTextSuccess: {
    color: THEME.success,
  },

  statusTextPending: {
    color: THEME.accent,
  },

  deleteButton: {
    padding: 5,
  },

  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: THEME.muted,
    textAlign: 'center',
    marginTop: 15,
  },
});