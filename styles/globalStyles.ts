import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  /* ================= SCREEN ================= */

  screen: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },

  content: {
    flex: 1,
    padding: 20,
    marginTop: -10,
    alignItems: "center", // center children like the card
  },

  flexOne: {
    flex: 1,
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#1E3A8A",
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
    width: "90%",
    maxWidth: 400,
  },

  cardCompact: {
    padding: 15,
    width: "90%",
    maxWidth: 400,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cardSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  cardSmallTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cardSpace: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* ================= TEXT ================= */

  textPrimary: {
    fontSize: 16,
  },

  textSecondary: {
    color: "#6B7280",
    marginTop: 4,
  },

  textMarginTop: {
    marginTop: 10,
  },

  registerTex: {
    marginTop: 15,
    textAlign: "center",
    color: "#007BFF",
    fontWeight: "500",
  },

  /* ================= INPUT ================= */

  input: {
    backgroundColor: "#F1F5F9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  inputSmallMargin: {
    marginBottom: 10,
  },

  /* ================= BUTTON ================= */

  button: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDelete: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDeleteText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },

  /* ================= CHIP (MATERIAS) ================= */

  chip: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  chipSelected: {
    backgroundColor: "#3B82F6",
  },

  chipText: {
    fontWeight: "600",
    color: "#1F2937",
  },

  chipTextSelected: {
    color: "white",
  },
});
