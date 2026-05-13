import { StyleSheet } from "react-native";

// ============================================================================
// COLORES MODERNOS
// ============================================================================

export const colors = {
  // Primarios - Azul/Violeta
  primary: "#6366F1", // Indigo
  primaryLight: "#818CF8", // Indigo light
  primaryDark: "#4F46E5", // Indigo dark

  // Secundarios - Violeta
  secondary: "#8B5CF6", // Violet
  secondaryLight: "#A78BFA", // Violet light
  secondaryDark: "#7C3AED", // Violet dark

  // Neutrales
  white: "#FFFFFF",
  black: "#1F2937",
  gray100: "#F9FAFB",
  gray200: "#F3F4F6",
  gray300: "#E5E7EB",
  gray400: "#D1D5DB",
  gray500: "#9CA3AF",
  gray600: "#6B7280",
  gray700: "#374151",

  // Estados
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Fondos
  background: "#F8FAFC",
  backgroundSecondary: "#F1F5F9",
};

// ============================================================================
// ESTILOS GLOBALES
// ============================================================================

export const globalStyles = StyleSheet.create({
  /* ================= SCREEN ================= */

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 16,
    paddingTop: 12,
  },

  contentCentered: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: colors.primary,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 16,
    elevation: 4,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: colors.white,
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerWithAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },

  cardLarge: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 5,
  },

  cardCompact: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 12,
  },

  cardSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 8,
  },

  cardDescription: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
  },

  /* ================= DIVIDER ================= */

  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 12,
  },

  dividerSmall: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 8,
  },

  /* ================= TYPOGRAPHY ================= */

  text: {
    fontSize: 14,
    color: colors.black,
  },

  textLarge: {
    fontSize: 16,
    color: colors.black,
  },

  textSmall: {
    fontSize: 12,
    color: colors.gray600,
  },

  textBold: {
    fontWeight: "700",
  },

  textSemibold: {
    fontWeight: "600",
  },

  textMuted: {
    color: colors.gray500,
  },

  textSecondary: {
    color: colors.gray600,
    fontSize: 14,
  },

  textError: {
    color: colors.error,
    fontSize: 14,
  },

  textSuccess: {
    color: colors.success,
    fontSize: 14,
  },

  /* ================= INPUT ================= */

  input: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.gray300,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
    minHeight: 44,
    fontSize: 15,
    color: colors.black,
  },

  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  inputError: {
    borderColor: colors.error,
  },

  inputSmall: {
    marginBottom: 8,
    paddingVertical: 10,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 6,
  },

  inputContainer: {
    marginBottom: 16,
  },

  /* ================= BUTTON ================= */

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },

  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  buttonSmallText: {
    fontSize: 14,
  },

  buttonSecondary: {
    backgroundColor: colors.secondary,
  },

  buttonDanger: {
    backgroundColor: colors.error,
  },

  buttonSuccess: {
    backgroundColor: colors.success,
  },

  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },

  buttonOutlineText: {
    color: colors.primary,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },

  /* ================= CHIP ================= */

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.gray200,
    marginRight: 8,
    marginBottom: 8,
  },

  chipSelected: {
    backgroundColor: colors.primary,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray700,
  },

  chipTextSelected: {
    color: colors.white,
  },

  chipDelete: {
    backgroundColor: colors.error,
  },

  chipDeleteText: {
    color: colors.white,
  },

  /* ================= BADGE ================= */

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },

  badgeSmall: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    fontSize: 10,
  },

  /* ================= PRIORITY INDICATOR ================= */

  priorityHigh: {
    backgroundColor: colors.error,
  },

  priorityMedium: {
    backgroundColor: colors.warning,
  },

  priorityLow: {
    backgroundColor: colors.info,
  },

  /* ================= LIST ITEM ================= */

  listItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: 8,
    alignItems: "center",
  },

  listItemCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },

  listItemSelected: {
    backgroundColor: colors.primaryLight,
  },

  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },

  /* ================= FLEXBOX ================= */

  row: {
    flexDirection: "row",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  column: {
    flexDirection: "column",
  },

  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  flexOne: {
    flex: 1,
  },

  /* ================= SPACING ================= */

  gap8: {
    gap: 8,
  },

  gap12: {
    gap: 12,
  },

  gap16: {
    gap: 16,
  },

  mt8: {
    marginTop: 8,
  },

  mt12: {
    marginTop: 12,
  },

  mt16: {
    marginTop: 16,
  },

  mb8: {
    marginBottom: 8,
  },

  mb12: {
    marginBottom: 12,
  },

  mb16: {
    marginBottom: 16,
  },

  /* ================= LOADING & STATES ================= */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  emptyStateText: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: "center",
    marginTop: 12,
  },

  errorContainer: {
    backgroundColor: colors.error,
    opacity: 0.1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },

  errorText: {
    color: colors.error,
    fontWeight: "600",
    fontSize: 14,
  },

  successContainer: {
    backgroundColor: colors.success,
    opacity: 0.1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },

  successText: {
    color: colors.success,
    fontWeight: "600",
    fontSize: 14,
  },
});
