import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Pressable,
} from 'react-native';

import Colors from "../Themes/colors";
import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export function Song({ album_img, title, artists, album, duration, external_url, preview_url, navigation }) {

    const parseArtists = (artists) => {
        var numArtists = artists.length;
        if (numArtists > 1) {
            var artistsStr = "";
            for(var i = 0; i < numArtists-1; i++) {
                var artistsStr = artistsStr + artists[i] + ", ";
            }
            artistsStr = artistsStr + artists[numArtists-1];
            return artistsStr;
        } else {
            return artists[0];
        }
    }
    return (
        <Pressable // press whole row
            onPress={ () => navigation.navigate("SongDetail", { external_url: external_url }) } 
            style={({ pressed }) => [
            {
              backgroundColor: pressed ? "black" : Colors.background,
            },
            styles.post
        ]}>
            <Pressable // press play button
                onPress={ () => navigation.navigate("SongPreview", { preview_url: preview_url }) }
                style={({ pressed }) => [ 
                {
                    opacity: pressed ? 0.7 : 1,
                },
                styles.index_container
            ]}>
                <FontAwesome name="play-circle" size={24} color={Colors.spotify} />
            </Pressable>

            <Image source={album_img} />

            <View style={styles.title_artist_container}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.other_text} numberOfLines={1}>
                    {parseArtists(artists)}
                </Text>
            </View>

            <View style={styles.album_container}>
                <Text style={styles.other_text} numberOfLines={1}>
                    {album}
                </Text>
            </View>

            <View style={styles.duration_container}>
                <Text style={styles.other_text}>
                    {duration}
                </Text>
            </View>
        
        </Pressable>
    );
  }
  
export default Song;

const styles = StyleSheet.create({
    post: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: windowWidth,
    },
    index_container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
        paddingRight: 10,
    },
    album_img_container: {
        flex: 5,
    },
    title: {
        fontWeight: "400",
        color: "white",
        fontSize: 16,
    },
    title_artist_container: {
        justifyContent: "center",
        flexDirection: 'column',
        flex: 15,
        paddingHorizontal: 10,
    },
    other_text: {
        color: Colors.gray,
        fontSize: 14,
    },
    album_container: {
        justifyContent: "center",
        flex: 10,
    },
    duration_container: {
        width: 35,
        justifyContent: "center",
        alignItems: "center",
    },
});