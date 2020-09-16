import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import api from '../services/api';

function New({ navigation }) {
  const [data, setData] = useState({
    preview: null,
    image: '',
    author: '',
    place: '',
    description: '',
    hashtags: '',
  });

  function handleSelectImage() {
    const options = {
      title: 'Selecionar Imagem',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${response.data}`,
        };

        let prefix;
        let ext;

        if (response.fileName) {
          [prefix, ext] = response.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }

        console.log(`${prefix}.${ext}`);

        const image = {
          uri: response.uri,
          type: response.type,
          name: `${prefix}.${ext}`,
        };

        setData({ ...data, preview, image });
      }
    });
  }

  async function handleSubmit() {
    const formData = new FormData();

    formData.append('image', data.image);
    formData.append('author', data.author);
    formData.append('place', data.place);
    formData.append('description', data.description);
    formData.append('hashtags', data.hashtags);

    await api.post('posts', formData);

    navigation.navigate('Feed');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
        <Text style={styles.selectButtonText}>Selecionar imagem</Text>
      </TouchableOpacity>

      {data.preview && <Image style={styles.preview} source={data.preview} />}

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome do autor"
        placeholderTextColor="#999"
        value={data.author}
        onChangeText={(author) => setData({ ...data, author })}
      />

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Local da foto"
        placeholderTextColor="#999"
        value={data.place}
        onChangeText={(place) => setData({ ...data, place })}
      />

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Descrição"
        placeholderTextColor="#999"
        value={data.description}
        onChangeText={(description) => setData({ ...data, description })}
      />

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        value={data.hashtags}
        onChangeText={(hashtags) => setData({ ...data, hashtags })}
      />

      <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default New;
