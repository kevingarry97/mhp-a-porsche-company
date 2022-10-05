import React, {useEffect, useState} from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";
import { Entypo, Feather } from '@expo/vector-icons';
import Screen from "../components/screen";
import useApi from "../hooks/useApi";
import Houses from "../api/houses";

const ListingScreen = ({navigation}) => {
    const [layout, setLayout] = useState('grid');
    const {data: houses, loading: bannersLoading, request: loadHouses} = useApi(Houses.getHouses);

    useEffect(() => {
        loadHouses();
    }, []);

    return (
        <Screen>
            <View style={styles.topBar}>
                <Text style={styles.title}>MHP Porsche</Text>
            </View>
            <View style={styles.searchBar}>
                <View style={[styles.searchBox, styles.flex1]}>
                    <Feather name="search" size={16} color={colors.muted} />
                    <TextInput style={[{ marginLeft: 10}]} placeholder='Search' />
                </View>
                <View style={styles.layout}>
                    <TouchableOpacity onPress={() => setLayout('list')} style={layout == 'list' && styles.activeLayout}>
                        <Entypo name="list" size={24} color={layout == 'list' ? colors.dangerLight : colors.muted} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLayout('grid')} style={layout == 'grid' && styles.activeLayout}>
                        <Entypo name="grid" size={24} color={layout == 'grid' ? colors.dangerLight : colors.muted} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.info}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={layout == 'grid' ? styles.grid : styles.list}>
                    {houses.map((item, key) => (
                        <View key={key} style={layout == 'grid' ? [styles.card, key % 2 == 1 && { marginVertical: 15}] : [styles.card, {flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', width: '95%', height: 70, marginVertical: 5}]}>
                            <View>
                                <Text style={styles.name}>{item.name ? item.name : 'No Name'}</Text>
                                <Text style={styles.gender}>{item.gender}</Text>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detail', key + 1)}>
                                <Text style={styles.small}>Enter House</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    activeLayout: {
        backgroundColor: colors.white,
        paddingHorizontal: 6,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 3
    },
    button: {
        paddingVertical: 7,
        backgroundColor: colors.muted + '11',
        marginTop: 20,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        marginHorizontal: 10,
        borderRadius: 8,
        width: '43%',
        height: 130,
        paddingHorizontal: 10
    },
    flex1: {
        flexGrow: 1
    },
    gender: {
        color: colors.muted,
        fontSize: 11,
        fontWeight: '500'
    },
    grid: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 30
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 15
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 10,
        color: colors.dangerLight
    },
    layout: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {
        marginTop: 10,
        paddingBottom: 30
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 40
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primaryLighter,
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 30,
        marginRight: 20
    },
    small: {
        fontSize: 11,
        color: colors.primary,
        fontWeight: '500'
    },
    title: {
        fontSize: 21,
        fontWeight: '700',
        color: colors.primary
    },
    topBar: {
        paddingLeft: 30,
        paddingTop: 20
    }
})

export default ListingScreen;