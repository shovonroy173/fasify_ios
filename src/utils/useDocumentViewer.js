import { viewDocument } from '@react-native-documents/viewer';

export const openDocument = async (file) => {
  await viewDocument(
    file.bookmark ? { bookmark: file.bookmark } : { uri: file.uri, mimeType: file.mimeType }
  );
};
