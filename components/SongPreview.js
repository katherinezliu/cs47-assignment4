import { 
    StyleSheet, 
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import Colors from "../Themes/colors";

export function SongPreview ({ navigation, route }) {
    const params = route.params;
    
    return (
        <View style={styles.container}>
            <WebView source={{ uri: params.preview_url }} />
        </View>
    );
}

export default SongPreview

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1, // need this otherwise entire page will be white
    },
});