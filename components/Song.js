import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import Colors from "../Themes/colors";

const windowWidth = Dimensions.get('window').width;

export function Song({ index, album_img, title, artists, album, duration }) {

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
      <View style={styles.post}>
        <View style={styles.index_container}>
            <Text style={styles.index_text}>
                {index}
            </Text>
        </View>

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
      </View>
    );
  }
  
export default Song;

const styles = StyleSheet.create({
    post: {
        backgroundColor: Colors.background,
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
    index_text: {
        color: Colors.gray,
        fontSize: 16,
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