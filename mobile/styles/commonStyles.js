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
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: THEME.bgSoft,
		paddingHorizontal: 20,
		paddingVertical: 28,
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
});
