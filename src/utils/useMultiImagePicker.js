import { launchImageLibrary } from 'react-native-image-picker';

export const useMultiImagePicker = () => {
  const pickFromGalleryMulti = (onSuccess, onClose) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8,
      selectionLimit: 0, // multiple selection enabled
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) {
        console.log('Image picking cancelled or failed');
      } else {
        const uris = response.assets?.map((asset) => asset.uri).filter(Boolean);
        if (uris && uris.length) {
          onSuccess(uris);
          onClose();
        }
      }
    });
  };

  return { pickFromGalleryMulti };
};
