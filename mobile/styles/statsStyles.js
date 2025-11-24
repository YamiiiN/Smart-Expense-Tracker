import { StyleSheet, Platform } from 'react-native';

// Using the same Forest-Modern theme
const THEME = {
  primaryA: '#175C3A',
  primaryB: '#2FAF7B',
  accent: '#FFB703',
  calmBlue: '#3BA7E6',
  bgSoft: '#F6FFF8',
  card: '#FFFFFF',
  text: '#08121A',
  muted: '#6B7A78',
  lightGreen: '#E9F8EE',
  chartTeal: '#64D2B0',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.lightGreen,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  headerContainer: {
    marginTop: 50,
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.text,
    fontFamily: Platform.select({ 
      ios: 'HelveticaNeue-Bold', 
      android: 'Roboto', 
      default: 'System' 
    }),
  },

  // Summary Card (replacing the cyan card from design)
  summaryCard: {
    backgroundColor: THEME.chartTeal,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: THEME.primaryB,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 11,
    color: THEME.text,
    marginBottom: 6,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.text,
  },

  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(8, 18, 26, 0.15)',
    marginHorizontal: 8,
  },

  // Chart Sections
  chartSection: {
    backgroundColor: THEME.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },

  chartContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 0,
  },

  // Charts Row (Donut + Horizontal Bars)
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  smallChartContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  // Donut Chart Legend
  legendContainer: {
  marginTop: 15,
  width: '100%',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
},

legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 8,
  marginBottom: 6,
},

legendColorBox: {
  width: 12,
  height: 12,
  borderRadius: 3,
  marginRight: 6,
},

legendText: {
  fontSize: 12,
  color: '#333',
},

  // Gifted Charts specific styles
  pieChartWrapper: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
},

  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerLabelText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#2FAF7B',
  textAlign: 'center',
},

  centerLabelSubtext: {
  fontSize: 12,
  color: '#6B7A78',
  textAlign: 'center',
},

   horizontalChartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80, // space between chart and labels
  },
  headerSubtitle: {
  fontSize: 14,
  color: '#6B7A78',
  marginTop: 4,
},
  horizontalLabelsContainer: {
  marginTop: 10,
  paddingHorizontal: 10,
},

  horizontalLabelRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 4,
},
  horizontalLabel: {
  fontSize: 13,
  color: '#333',
  flex: 1,
},
  horizontalValue: {
  fontSize: 13,
  color: '#2FAF7B',
  fontWeight: '600',
  marginLeft: 8,
},
chartCard: {
  backgroundColor: '#fff',
  borderRadius: 16,
  paddingVertical: 20,
  paddingHorizontal: 16,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
},
});