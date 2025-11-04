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
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 15,
    textAlign: 'center',
  },

  chartContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  // Charts Row (Donut + Horizontal Bars)
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  smallChartContainer: {
    flex: 1,
    backgroundColor: THEME.card,
    borderRadius: 18,
    padding: 18,
    marginTop: 25,
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

  // Donut Chart Legend
  legendContainer: {
    marginTop: 10,
    gap: 8,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  legendText: {
    fontSize: 13,
    color: THEME.muted,
    fontWeight: '500',
  },

  // Gifted Charts specific styles
  pieChartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
  },

  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerLabelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.text,
  },

  centerLabelSubtext: {
    fontSize: 11,
    color: THEME.muted,
    marginTop: 2,
  },

  horizontalChartWrapper: {
    marginTop: 5,
    marginBottom: 90,
    alignItems: 'center',
    alignContent: 'center',
  },

  horizontalLabelsContainer: {
    gap: 2.5,
    fontSize: 7,
  },

  horizontalLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    marginTop: 4,
  },

  horizontalLabel: {
    fontSize: 14,
    color: THEME.muted,
    fontWeight: '800',
  },

  horizontalValue: {
    fontSize: 10,
    color: THEME.text,
    fontWeight: '700',
    marginLeft: 'auto'
  },
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

});