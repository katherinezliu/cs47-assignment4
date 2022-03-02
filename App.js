import { StyleSheet, Text, Image, Pressable, SafeAreaView, StatusBar} from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import Images from "./Themes/images"

import SongList from "./components/SongList"
import { View, /* StatusBar */} from "react-native-web";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  StatusBar.setBarStyle('light-content');
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
      // TODO: Comment out which one you don't want to use
      // myTopTracks or albumTracks

      const res = await myTopTracks(token);
      // const res = await albumTracks(ALBUM_ID, token);
      setTracks(res);
    };

    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      
      {token ? (
        <>
          <SafeAreaView style={styles.header}>
            <Image style={styles.spotify_icon} source={Images.spotify} />
            <Text style={styles.header_text}>My Top Tracks</Text>
          </SafeAreaView>
          <SongList tracks={tracks}/>
        </>
      ) : (
        <Pressable style={styles.connect_button} onPress={promptAsync}>
          <Image style={styles.spotify_small_icon} source={Images.spotify} />
          <Text style={styles.connect_text}>CONNECT WITH SPOTIFY</Text>
        </Pressable>
      )
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  connect_button: {
    backgroundColor: Colors.spotify,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99999,
    padding: 10,
  },
  spotify_small_icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  connect_text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  header_text: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  spotify_icon: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
});
