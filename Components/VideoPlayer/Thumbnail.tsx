import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import {createThumbnail} from 'react-native-create-thumbnail';

const screenWidth = Dimensions.get('screen').width;

const ThumbnailProgressBar = ({videoUri}: any) => {
  const videoRef: any = useRef(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [videoEndTime, setVideoEndtime] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const [isShowButton, setShowButton] = useState(true);
  const numThumbnails = 7;

  const [isSeeking, setIsSeeking] = useState(false);

  const iconSource = isPlay
    ? require('././assets/pause.png')
    : require('././assets/play.png');

  const handleOnLoad = async data => {
    setVideoEndtime(data.duration);
    setProgressWidth(0);
  };

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted
  
    const generateThumbnails = async () => {
      setLoading(true);
      try {
        if (videoRef.current) {
          const duration = videoEndTime;
          const getTimeInterval = duration / numThumbnails;
  
          const thumbnail = await createThumbnail({
            url: videoUri,
            timeStamp: getTimeInterval * 1000,
            format: 'jpeg',
          });
  
          // Check if the component is still mounted before updating the state
          if (isMounted) {
            setThumbnail(thumbnail.path);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
  
    generateThumbnails();
  
    // Cleanup function to set the flag to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [videoUri, videoEndTime, numThumbnails]);
  

  const renderImages = () => {
    const images = [];

    for (let i = 0; i < numThumbnails; i++) {
      images.push(
        <Image
          key={i}
          source={{uri: thumbnail}}
          style={{width: screenWidth / numThumbnails, height: 60}}
        />,
      );
    }

    return images;
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={'small'} color={'blue'} />
      ) : (
        <View>
          <View>
            <Video
              ref={videoRef}
              source={{uri: videoUri}}
              controls={false}
              style={{width: screenWidth, height: 400, zIndex: 1}}
              useNativeControls
              paused={!isPlay || isSeeking}
              resizeMode="contain"
              onLoad={handleOnLoad}
              onEnd={() => {
                setProgressWidth(0);
              }}
              onProgress={progress => {
                if (!isSeeking) {
                  setProgressWidth(
                    (progress.currentTime / videoEndTime) * screenWidth,
                  );
                }
               
              }}
            />
            <View
              style={{
                position: 'absolute',
                zIndex: 999,
              }}>
              <TouchableOpacity
                onPress={() => setPlay(prev => !prev)}
                onPressIn={() => setShowButton(true)}
                onPressOut={() => {
                  setTimeout(() => {
                    !isPlay && setShowButton(false);
                  }, 500);
                }}
                style={{
                  width: screenWidth,
                  height: 400,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isShowButton
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'transparent',
                }}>
                {isShowButton && (
                  <Image
                    source={iconSource}
                    style={{
                      width: screenWidth * 0.3,
                      height: screenWidth * 0.3,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', position: 'relative'}}>
              {thumbnail ? renderImages(): null}
            </View>
            <View
              onTouchMove={e => console.log(e)}
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            />
            <View
              onTouchMove={e => {
                setIsSeeking(true);
                videoRef.current.seek(
                  (e.nativeEvent.locationX / screenWidth) * videoEndTime,
                );
                if (isSeeking) {
                  setProgressWidth(e.nativeEvent.locationX);
                }
              }}
              onTouchEnd={() => setIsSeeking(false)}
              style={[
                {
                  height: 60,
                  backgroundColor: 'transparent',
                  zIndex: 1999,
                  position: 'absolute',
                  width: screenWidth,
                },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ThumbnailProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    position: 'absolute',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});