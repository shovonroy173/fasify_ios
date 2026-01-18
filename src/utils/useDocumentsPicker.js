import { pick } from '@react-native-documents/picker';

export const useDocumentsPicker = () => {
  const pickDocuments = async (onSuccess, onError) => {
    try {
      // opens a multi-file picker
      const results = await pick({ allowMulti: true });
      onSuccess(
        results.map(r => ({
          name: r.name,
          uri: r.uri,
          mimeType: r.mimeType,
          size: r.size,
          bookmark: r.bookmark, // iOS long term access
        })),
      );
    } catch (err) {
      if (err.code !== 'DOCUMENTS_PICKER_CANCELED') {
        console.error(err);
        onError?.(err);
      }
    }
  };

  return { pickDocuments };
};
