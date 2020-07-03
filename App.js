import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

import photosByPage from './src/photosByPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoArr: [],
      pagesLoaded: 0,
      gallery: undefined,
      modalImage: undefined,
      modalVisible: false,
    }
    this.getPhotoDetails();
  }

  setModalVisible = (visible, imageUrl) => {
    this.setState({
      modalImage: imageUrl,
      modalVisible: visible,
    });
  }

  getPhotoDetails = async() => {
    let page = this.state.pagesLoaded + 1;
    if (page <= 10) {
      let photos = await photosByPage(page);
      let newPhotoArr = this.state.photoArr;
      photos.forEach(photo => {
        newPhotoArr.push({
          id: photo.id,
          urls: photo.urls,
          userId: photo.user.id,
          username: photo.user.username,
        });
      });
      this.setState({
        photoArr: newPhotoArr,
        pagesLoaded: page,
      });
      this.buildGallery();
    }
  }

  buildGallery = () => {
    const gallery = this.state.photoArr.map(photo => {
      return (
          <TouchableWithoutFeedback key={photo.id} onPress={() => this.setModalVisible(true, photo.urls.raw)}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: photo.urls.raw}}
                style={styles.image}
              />
              <Text style={styles.imageText}>id: {photo.id}</Text>
              <Text style={styles.imageText}>author: {photo.username}</Text>
            </View>
          </TouchableWithoutFeedback>
        
      );
    });
    this.setState({
      gallery: gallery,
    });
  }

  render() {
    const gallery = this.state.gallery;
    const modalVisible = this.state.modalVisible;
    return (
        <View style={{flex: 1}}>
         <View style={styles.button}>
           <TouchableNativeFeedback onPress={this.getPhotoDetails}>
             <Text style={styles.text}>+</Text>
           </TouchableNativeFeedback>
         </View>
         <ScrollView>
           <View style={styles.scroll}>
             <Modal
              style={styles.modal}
              animationType={'fade'}
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.modal}>
                <ImageBackground source={{uri: this.state.modalImage}} resizeMode='contain' style={{width: '100%', height: '100%'}}>
                  <Text style={styles.modalText} onPress={() => this.setModalVisible(false)}>
                    Close
                  </Text>
                </ImageBackground>
              </View>
             </Modal>
             {gallery}
           </View>
         </ScrollView>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: '2%',
    width: '50%',
    height: Dimensions.get('window').height / 2,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#123',
    marginTop: 3,
    paddingHorizontal: '45%',
  },
  scroll: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  modal: {
    flex: 1,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalText: {
    color: '#fff',
    padding: 5,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    width: '97%',
    height: '80%',
  },
  imageText: {
    fontSize: 16,
    color: '#123456',
    alignSelf: 'center',
  }
});

export default App;
