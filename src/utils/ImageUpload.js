import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Text,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Controller, useFormContext} from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraDevices,
// } from 'react-native-vision-camera';

const ImageUpload = ({name}) => {
  const {control} = useFormContext();
  const [alertVisible, setAlertVisible] = useState(false);
//   const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentOnChange, setCurrentOnChange] = useState(null);
//   const cameraRef = useRef(null);
  const [photoPath, setPhotoPath] = useState(null);
//   const [isFrontCamera, setIsFrontCamera] = useState(true);
  const theme = useColorScheme();

//   useEffect(() => {
//     (async () => {
//       const cameraPermissionStatus = await Camera.requestCameraPermission();
//       if (cameraPermissionStatus !== 'granted') {
//         console.log('Camera permission denied');
//       }
//     })();
//   }, []);

//   const device = useCameraDevice(isFrontCamera ? 'front' : 'back');

//   const openCamera = () => {
//     setIsCameraActive(true);
//     setAlertVisible(false);
//   };

//   const closeCamera = () => {
//     setIsCameraActive(false);
//   };

//   const toggleCamera = () => {
//     setIsFrontCamera(prev => !prev);
//   };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        console.log(response.assets[0]?.uri);
        setPhotoPath(response.assets[0]?.uri);
        currentOnChange && currentOnChange(response.assets[0]?.uri);
      }
    });
    setAlertVisible(false);
  };

//   const handleTakePhoto = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePhoto();
//         setPhotoPath(`file://${photo.path}`);
//         currentOnChange && currentOnChange(`file://${photo.path}`);
//         setIsCameraActive(false);
//       } catch (error) {
//         console.log('Error taking photo:', error);
//       }
//     }
//   };

  const styles = getStyles(theme);
  console.log(photoPath);

  return (
    <>


  
      {/* <Modal visible={isCameraActive} animationType="fade" transparent={false}>
        <View style={styles.cameraContainer}>
          {device ? (
            <Camera
              style={StyleSheet.absoluteFill}
              ref={cameraRef}
              device={device}
              isActive={isCameraActive}
              photo={true}
              videoStabilizationMode="cinematic"
            />
          ) : (
            <ActivityIndicator size="large" color="#1C6758" />
          )}

          
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePhoto}>
            <MaterialIcons
              name="camera"
              size={30}
              color={theme === 'dark' ? '#e5e7eb' : '#18181b'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
            <MaterialIcons
              name="cameraswitch"
              size={24}
              color={theme === 'dark' ? '#e5e7eb' : '#18181b'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
            <MaterialIcons
              name="close"
              size={24}
              color={theme === 'dark' ? '#e5e7eb' : '#18181b'}
            />
          </TouchableOpacity>
        </View>
      </Modal> */}

      {/* Gallery & Camera Selection Modal */}
      <Modal
        transparent
        visible={alertVisible}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.title}>Upload Photo</Text>
            {/* <Text style={styles.message}>Choose an option</Text> */}

            {/* <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
              <Text style={styles.optionText}>📷 Open Front Camera</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
              <Text style={styles.optionText}>🖼 Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setAlertVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    uploadButton: {
      width: responsiveWidth(25),
      height: responsiveHeight(18),
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#2C6A2F' : '#43A041',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cameraContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    captureButton: {
      position: 'absolute',
      bottom: 50,
      width: 70,
      height: 70,
      backgroundColor: theme === 'dark' ? '#18181b' : '#e5e7eb',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    captureButtonText: {
      color: '#fff',
      fontSize: 25,
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      bottom: 60,
      right: 20,
      backgroundColor: theme === 'dark' ? '#18181b' : '#e5e7eb',

      padding: 10,
      borderRadius: 50,
    },
    flipButton: {
      position: 'absolute',
      bottom: 60,
      left: 20,
      backgroundColor: theme === 'dark' ? '#18181b' : '#e5e7eb',

      padding: 10,
      borderRadius: 50,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBox: {
      width: 300,
      backgroundColor: theme === 'dark' ? '#27272a' : '#ffffff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
      marginBottom: 10,
      color: theme === 'dark' ? '#ffffff' : '#333333',
    },
    message: {
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      marginBottom: 20,
      color: theme === 'dark' ? ' #ccc' : '#666',
    },
    optionButton: {
      width: '100%',
      padding: 12,
      borderRadius: 5,
      backgroundColor: theme === 'dark' ? '#1f6fa3' : '#3498db',
      marginVertical: 5,
      alignItems: 'center',
    },
    optionText: {
      color: theme === 'dark' ? '#d1d5db' : '#18181b',
      fontFamily: 'Poppins-Medium',
    },
    cancelButton: {
      marginTop: 10,
    },
    cancelText: {
      color: theme === 'dark' ? '#d1d5db' : '#18181b',
      fontFamily: 'Poppins-Medium',
    },
    image: {
      width: responsiveWidth(25),
      height: responsiveHeight(18),
      objectFit: 'cover',
    },
  });

export default ImageUpload;
