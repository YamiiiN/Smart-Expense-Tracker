import { StyleSheet, Platform } from 'react-native';

// Unique unified theme: Forest-Modern — greens with golden yellow accents and deep contrasts
const THEME = {
	primaryA: '#175C3A', // deep forest green
	primaryB: '#2FAF7B', // fresh green
	accent: '#FFB703', // golden yellow
	calmBlue: '#3BA7E6',
	bgSoft: '#F6FFF8',
	card: '#FFFFFF',
	text: '#08121A',
	muted: '#6B7A78',
};

export default StyleSheet.create({
	// Screen wrapper
	container: {
		flex: 1,
		backgroundColor: "#E9F8EE",
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: THEME.bgSoft,
		paddingHorizontal: 20,
		paddingVertical: 28,
		paddingTop: 40
	},

	// Full-screen gradient container (used by LinearGradient)
	gradientBackground: {
		flex: 1,
		width: '100%',
	},

	// Large soft shapes behind the card
	decoGradientTop: {
		position: 'absolute',
		top: -80,
		right: -100,
		width: 220,
		height: 220,
		borderRadius: 110,
		backgroundColor: THEME.primaryB,
		opacity: 0.15,
	},

	decoGradientBottom: {
		position: 'absolute',
		bottom: -100,
		left: -100,
		width: 240,
		height: 240,
		borderRadius: 120,
		backgroundColor: THEME.accent,
		opacity: 0.12,
	},

	// Central card for auth forms
	card: {
		width: '100%',
		maxWidth: 460,
		backgroundColor: THEME.card,
		borderRadius: 18,
		padding: 26,
		alignItems: 'stretch',
		zIndex: 2,
		...Platform.select({
			ios: {
				shadowColor: THEME.primaryA,
				shadowOffset: { width: 0, height: 12 },
				shadowOpacity: 0.06,
				shadowRadius: 24,
			},
			android: {
				elevation: 10,
			},
		}),
	},

	// Logo area
	logoContainer: {
		alignItems: 'center',
		marginBottom: 14,
	},

	logoCircle: {
		width: 96,
		height: 96,
		borderRadius: 48,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 12,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: THEME.primaryA,
	},

	logoImage: {
		width: 92,
		height: 92,
		borderRadius: 46,
		resizeMode: 'cover',
	},

	title: {
		fontSize: 22,
		textAlign: 'center',
		color: THEME.text,
		fontWeight: '700',
		marginBottom: 6,
		fontFamily: Platform.select({ ios: 'HelveticaNeue-Medium', android: 'Roboto', default: 'System' }),
	},

	subtitle: {
		textAlign: 'center',
		color: THEME.muted,
		marginBottom: 14,
		fontSize: 14,
		fontFamily: Platform.select({ ios: 'HelveticaNeue', android: 'Roboto', default: 'System' }),
	},

	tagline: {
		textAlign: 'center',
		color: THEME.muted,
		marginTop: 6,
		fontSize: 13,
		fontFamily: Platform.select({ ios: 'HelveticaNeue', android: 'Roboto', default: 'System' }),
	},

	input: {
		borderWidth: 1,
		borderColor: '#E8F0EA',
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 14,
		marginVertical: 8,
		backgroundColor: '#FBFFFB',
		color: THEME.text,
	},

	// Button with internal gradient wrapper
	buttonGradient: {
		width: '100%',
		borderRadius: 12,
		overflow: 'hidden',
		marginTop: 12,
	},

	button: {
		paddingVertical: 14,
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttonText: {
		color: THEME.card,
		fontWeight: '700',
		fontSize: 16,
		letterSpacing: 0.4,
	},

	// Alternative button (flat) — e.g., create account
	buttonAlt: {
		backgroundColor: THEME.accent,
		paddingVertical: 12,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 12,
	},

	buttonTextAlt: {
		color: THEME.primaryA,
		fontWeight: '700',
		fontSize: 15,
	},

	link: {
		color: THEME.primaryB,
		marginTop: 12,
		textAlign: 'center',
	},

		/* Dashboard / Home specific styles */
		
		statsRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 6,
		},

		statCard: {
			flex: 1,
			backgroundColor: '#F3FFF6',
			padding: 12,
			borderRadius: 12,
			marginHorizontal: 6,
			alignItems: 'center',
		},

		statValue: {
			fontSize: 18,
			fontWeight: '700',
			color: THEME.primaryA,
		},

		statLabel: {
			fontSize: 12,
			color: THEME.muted,
			marginTop: 6,
		},

		quickActions: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 18,
		},

		actionButton: {
			flex: 1,
			backgroundColor: THEME.primaryB,
			paddingVertical: 12,
			borderRadius: 12,
			alignItems: 'center',
			marginHorizontal: 6,
		},

		actionIcon: {
			fontSize: 20,
			marginBottom: 6,
			color: '#fff',
		},

		actionText: {
			color: '#fff',
			fontWeight: '700',
		},

		transactionsTitle: {
			marginTop: 20,
			fontSize: 16,
			fontWeight: '700',
			color: THEME.text,
		},

		transactionItem: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 12,
			borderBottomWidth: 1,
			borderBottomColor: '#EEF6F0',
		},

		transactionTitle: {
			color: THEME.text,
			fontWeight: '600',
		},

		transactionAmount: {
			color: THEME.primaryA,
			fontWeight: '700',
		},

		/* Home screen styles (moved from screens/Home.js) */
		safe: {
			flex: 1,
			backgroundColor: THEME.bgSoft,
		},

		hero: {
			marginTop: 40,
			alignItems: 'center',
		},

		actions: {
			alignItems: 'center',
		},

		primaryButton: {
			width: '100%',
			backgroundColor: THEME.calmBlue,
			paddingVertical: 14,
			borderRadius: 12,
			alignItems: 'center',
			marginBottom: 12,
			shadowColor: THEME.calmBlue,
			shadowOpacity: 0.14,
			shadowOffset: { width: 0, height: 8 },
			shadowRadius: 20,
			elevation: 3,
		},

		primaryText: {
			color: '#fff',
			fontWeight: '600',
			fontSize: 16,
		},

		secondaryButton: {
			width: '100%',
			borderWidth: 1,
			borderColor: '#CBD5E1',
			paddingVertical: 14,
			borderRadius: 12,
			alignItems: 'center',
			backgroundColor: '#fff',
			marginBottom: 14,
		},

		secondaryText: {
			color: THEME.text,
			fontWeight: '600',
			fontSize: 16,
		},

		linkText: {
			color: '#64748B',
			fontSize: 14,
		},
		// Home screen (Onboarding-style) design
homeSafe: {
  flex: 1,
  backgroundColor: '#E6FAEE',
},

homeGradient: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 24,
},

homeImage: {
  width: '75%',
  height: undefined,
  aspectRatio: 1,
  resizeMode: 'contain',
  marginBottom: 24,
},

homeTitle: {
  fontSize: 22,
  color: '#175C3A',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 10,
},

homeSubtitle: {
  fontSize: 14,
  color: '#6B7A78',
  textAlign: 'center',
  marginBottom: 40,
  maxWidth: '85%',
  lineHeight: 20,
},

homeButton: {
  width: '85%',
  backgroundColor: '#2FAF7B',
  paddingVertical: 16,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#2FAF7B',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
  elevation: 3,
},

homeButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '700',
},

homeLinkWrapper: {
  marginTop: 14,
},

homeLinkText: {
  color: '#6B7A78',
  fontSize: 14,
  textAlign: 'center',
},

homeLinkHighlight: {
  color: '#2FAF7B',
  fontWeight: '600',
},

dashboardContainer: {
    flex: 1,
    backgroundColor: "#E9F8EE",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // leaves room for bottom nav
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  greetingText: {
    fontSize: 16,
    color: "#5A6F64",
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2F3E46",
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  balanceTitle: {
    fontSize: 16,
    color: "#6B9080",
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F3E46",
    marginBottom: 15,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceLabel: {
    fontSize: 15,
    color: "#6B9080",
  },
  balanceBox: {
    alignItems: "center",
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F3E46",
  },
  activitySection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#2F3E46",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activityLabel: {
    fontSize: 16,
    color: "#2F3E46",
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  navButton: {
    alignItems: "center",
  },

  profileContainer: {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 20,
  backgroundColor: "#fff",
},

profileTitle: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#2F3E46",
  marginBottom: 20,
  marginTop: 40
},

profileAvatar: {
  width: 120,
  height: 120,
  borderRadius: 60,
  marginBottom: 10,
},

changePhotoText: {
  fontSize: 12,
  color: "#007B83",
  textAlign: "center",
  marginBottom: 20,
},

inputContainer: {
  width: "100%",
  marginTop: 10,
},

inputLabel: {
  fontSize: 14,
  color: "#333",
  marginTop: 10,
},

input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  marginTop: 5,
  fontSize: 16,
  fontWeight: "bold",
},

readOnlyInput: {
  backgroundColor: "#f5f5f5",
},

buttonRow: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 20,
  width: "100%",
},

editButton: {
  backgroundColor: "#2F3E46",
  padding: 12,
  borderRadius: 10,
  width: "80%",
  alignItems: "center",
},

saveButton: {
  backgroundColor: "#38B000",
  padding: 12,
  borderRadius: 10,
  width: "40%",
  alignItems: "center",
  marginRight: 10,
},

cancelButton: {
  backgroundColor: "#A8A8A8",
  padding: 12,
  borderRadius: 10,
  width: "40%",
  alignItems: "center",
},

logoutButton: {
  marginTop: 30,
  padding: 12,
  backgroundColor: "#FF6B6B",
  borderRadius: 10,
  width: "80%",
  alignItems: "center",
},

logoutText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},

});