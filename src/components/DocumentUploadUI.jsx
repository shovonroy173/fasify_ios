import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
// import Feather from 'react-native-vector-icons/Feather';
import { openDocument } from "../utils/useDocumentViewer";
import ThemedText from "../utils/ThemedText";
import { Eye, Trash2 } from "lucide-react-native";

const DocumentsUploadUI = ({ label, docs = [], onRemove, onPick }) => {
  // console.log(docs);

  return (
    <View>
      {label && (
        <ThemedText styles="font-Medium mb-1">
          Business Registration and Policy Docs
        </ThemedText>
      )}

      <Pressable style={styles.button} onPress={onPick}>
        {/* <Feather name="file-plus" size={18} color="#333" /> */}
        <ThemedText styles="font-Medium px-4">Pick Documents</ThemedText>
      </Pressable>

      <FlatList
        data={docs}
        keyExtractor={(d, i) => d.uri + i}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Pressable onPress={() => openDocument(item)}>
              <Eye size={18} color="#3b82f6" />
              {/* <Feather name="eye" size={18} color="#3b82f6" /> */}
            </Pressable>
            <ThemedText style={styles.name} numberOfLines={1}>
              {item?.name || item}
            </ThemedText>
            <Pressable onPress={() => onRemove(index)}>
              {/* <Feather name="trash-2" size={18} color="#ef4444" /> */}
              <Trash2 size={18} color="#ef4444" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: { color: "#555", fontSize: 14, marginBottom: 8 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  buttonText: { marginLeft: 8, fontWeight: "600", fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: { flex: 1, marginHorizontal: 12 },
});

export default DocumentsUploadUI;
