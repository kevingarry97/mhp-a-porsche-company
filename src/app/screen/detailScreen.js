import React, { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Screen from "../components/screen";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../config/colors";
import useApi from "../hooks/useApi";
import Houses from "../api/houses";
import { FontAwesome5 } from '@expo/vector-icons';

const DetailScreen = ({navigation, route}) => {
    const { data, loading, request: getDetail } = useApi(Houses.detailHouse);

    useEffect(() => {
        getDetail(route.params);
    }, []);

    return (
        <Screen>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBar}>
                <AntDesign name="back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.body}>
                <Text style={styles.top}>- Houses Info</Text>
                <Text style={[styles.name, {marginTop: 20}]}>{data.name ? data.name : 'No Name'}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5 name={data.gender != 'Male' ? "female" : "male"} size={14} color={colors.primary} />
                    <Text style={[styles.gender, {fontSize: 13, marginLeft: 3}]}> {data.gender}</Text>
                </View>
                {data.culture && <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Culture: </Text>
                    <View style={styles.card}>
                        <Text style={[styles.gender, {color: colors.white}]}>{data.culture}</Text>
                    </View>
                </View>}
                {data.aliases && <View style={{marginBottom: 20, marginTop: 5}}>
                    <Text style={styles.alias}>Aliases</Text>
                    {data.aliases.map((item, key) => (
                        <Text key={key} style={styles.item}> -  {item}</Text>
                    ))}
                </View>
                }
                {(data.tvSeries && data.tvSeries.length > 1) && <View style={{marginBottom: 10}}>
                    <Text style={[styles.alias, {fontSize: 12}]}>TV Series</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                        {data.tvSeries.map((item, key) => (
                            <View style={[styles.card, {marginHorizontal: 5, backgroundColor: colors.dangerLight + '11'}]} key={key}>
                                <Text style={styles.series}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>}
                {data.books && <View>
                    <Text style={styles.alias}>Books</Text>
                    {data.books.map((item, key) => (
                        <Text key={key} style={[styles.item, {fontSize: 13, marginVertical: 3}]}> -  {item}</Text>
                    ))}
                </View>
                }
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    alias: {
        fontSize: 14,
        marginTop: 13,
        marginBottom: 5,
        fontWeight: '400',
        color: colors.primary
    },
    body: {
        paddingLeft: 40,
        paddingTop: 25,
        alignItems: 'flex-start'
    },
    card: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: colors.dangerLight,
        alignItems: 'center',
        margin: 10
    },
    gender: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.muted
    },
    item: {
        color: colors.muted,

    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.dangerLight,
        marginBottom: 10
    },
    series: {
        fontSize: 11,
        color: colors.dangerLight,
        fontWeight: '500'
    },
    top: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary
    },
    topBar: {
        paddingLeft: 30,
        paddingTop: 15
    }
})

export default DetailScreen;