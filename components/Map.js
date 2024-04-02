import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView, {Marker} from 'react-native-maps';

export default function Map({navigation}) {
    const [location, setLocation] = useState(null);

    const confirmLocationHandler = () => {
        console.log(location);  
    }

    return (
        <MapView style={styles.map}
            initialRegion={
                {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            onPress={(event) => {
                setLocation({
                    latitude: event.nativeEvent.coordinate.latitude,
                    longitude: event.nativeEvent.coordinate.longitude,
                })
            }}>
            <Marker coordinate={location} />
            {location && <Button title="Confirm Selected Location" onPress={confirmLocationHandler} />}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})