import {
    StyleSheet,
    View,
    FlatList,
    StatusBar,
} from 'react-native';

import Song from './Song';
import millisToMinutesAndSeconds from '../utils/millisToMinuteSeconds';

export function SongList({ tracks, navigation }) {
    StatusBar.setBarStyle('light-content');
    // console.log(tracks.map((item) => item.external_urls));
    return (
        <View style={styles.container}>
            <FlatList
                data={tracks}
                renderItem={({item}) =>
                    <Song 
                        album_img={item.album.images[2]}
                        title={item.name}
                        artists={item.artists.map((item) => item.name)}
                        album={item.album.name}
                        duration={millisToMinutesAndSeconds(item.duration_ms)}
                        external_url={item.external_urls.spotify}
                        preview_url={item.preview_url}
                        navigation={navigation}
                    />
                }
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
  
export default SongList;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden',
    },
    sort_by: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
    },
});