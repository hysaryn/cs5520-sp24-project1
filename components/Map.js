import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {Marker} from 'react-native-maps';

export default function Map({navigation, route}) {
    const [location, setLocation] = useState(null);

    useEffect(() => {   
        if (route.params.location) {
            setLocation(route.params.location)
        }
    })

    const confirmLocationHandler = () => {
         navigation.navigate('Profile', {location: location})
    }

    return (
        <MapView style={styles.map}
            initialRegion={
                {
                    latitude: route.params.location? route.params.location.latitude: 37.78825,
                    longitude: route.params.location? route.params.location.longitude: -122.4324,
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