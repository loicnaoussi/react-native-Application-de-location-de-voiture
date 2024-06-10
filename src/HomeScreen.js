import React, { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const menu = require("./assets/icons/menu.png");
const face = require("./assets/face.png");
const magnifying_glass = require("./assets/icons/magnifying-glass.png");
const splash = require("/home/fores06/Documents/Projets Actuels/Formation expo/react-native-rent-a-car/assets/splash.png");

const image_v_1 = require("./assets/vehicles/v-1.png");
const image_v_2 = require("./assets/vehicles/v-2.png");
const image_v_3 = require("./assets/vehicles/v-3.png");
const image_v_4 = require("./assets/vehicles/v-4.png");

import data from "./dataset/vehicles.json";

const HomeScreen = ({ navigation }) => {
    const [vehicles, setVehicles] = useState(data.vehicles);
    const [filteredVehicles, setFilteredVehicles] = useState(data.vehicles);

    const getImage = (id) => {
        if (id == 1) return image_v_1;
        if (id == 2) return image_v_2;
        if (id == 3) return image_v_3;
        if (id == 4) return image_v_4;
    }

    const searchVehicles = (keyword) => {
        const lowercasedKeyword = keyword.toLowerCase();
        const results = vehicles.filter(vehicle => {
            return vehicle.make.toLowerCase().includes(lowercasedKeyword);
        })
        setFilteredVehicles(results);
    }

    const convertPriceToXAF = (priceInUSD) => {
        return priceInUSD * 600; // 1 USD = 600 XAF
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerSection}>
                    <Image
                        source={splash}
                        resizeMode="contain"
                        style={styles.splashImageStyle}
                    />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>Louer une voiture</Text>
                </View>

                <View style={styles.searchSection}>
                    <View style={styles.searchPallet}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Rechercher une voiture"
                            onChangeText={(text) => searchVehicles(text)}
                        />
                        <View style={styles.searchIconArea}>
                            <Image
                                source={magnifying_glass}
                                resizeMode="contain"
                                style={styles.magnifyingIconStyle}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.typesSection}>
                    <TouchableOpacity onPress={() => setFilteredVehicles(vehicles)}>
                        <Text style={styles.typesTextActive}>Tout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilteredVehicles(vehicles.filter(vehicle => vehicle.type === "SUV"))}>
                        <Text style={styles.typesText}>SUV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilteredVehicles(vehicles.filter(vehicle => vehicle.type === "Berline"))}>
                        <Text style={styles.typesText}>Berline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilteredVehicles(vehicles.filter(vehicle => vehicle.type === "Monospace"))}>
                        <Text style={styles.typesText}>Monospace</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilteredVehicles(vehicles.filter(vehicle => vehicle.type === "Hatchback"))}>
                        <Text style={styles.typesText}>Hatchback</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.listSection}>
                    <Text style={styles.headText}>Les plus louées</Text>

                    {filteredVehicles.map((vehicle) => {
                        return (
                            <TouchableOpacity
                                style={styles.element}
                                key={vehicle.id}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Info', { id: vehicle.id })}
                            >
                                <View style={styles.infoArea}>
                                    <Text style={styles.infoTitle}>{vehicle.make} {vehicle.model}</Text>
                                    <Text style={styles.infoSub}>{vehicle.type} - {vehicle.transmission}</Text>
                                    <Text style={styles.infoPrice}>
                                        <Text style={styles.infoAmount}>{convertPriceToXAF(vehicle.price_per_day).toLocaleString()} XAF </Text>/jour
                                    </Text>
                                </View>
                                <View style={styles.imageArea}>
                                    <Image
                                        source={getImage(vehicle.id)}
                                        resizeMode="contain"
                                        style={styles.vehicleImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#e7e7e7",
    },
    container: {
        flexGrow: 1,
        paddingRight: 35,
        paddingLeft: 35,
    },
    headerSection: {
        height: 200,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    splashImageStyle: {
        width: 500, // Augmentez la largeur
        height: 200, // Augmentez la hauteur
    },
    titleSection: {
        marginTop: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
    },
    searchSection: {
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: "center",
    },
    searchPallet: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        borderRadius: 8,
        width: "100%",
        height: 30,
        backgroundColor: "white",
    },
    searchInput: {
        width: 245,
        height: 30,
        backgroundColor: "white",
    },
    searchIconArea: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    magnifyingIconStyle: {
        width: 24,
        height: 24,
        marginRight: -10,
    },
    typesSection: {
        marginTop: 15,
        flexDirection: "row",
    },
    typesTextActive: {
        fontSize: 15,
        marginRight: 34,
        fontWeight: "bold",
        color: "black",
    },
    typesText: {
        fontSize: 15,
        marginRight: 33,
        fontWeight: "500",
        color: "#696969",
    },
    listSection: {
        marginTop: 25,
    },
    headText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    element: {
        height: 100,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        marginBottom: 13,
    },
    infoArea: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: "bold",
    },
    infoSub: {
        fontSize: 11,
        fontWeight: "600",
        color: "#696969",
    },
    infoPrice: {
        position: "absolute",
        bottom: 0,
        fontSize: 10,
        color: "#696969",
        fontWeight: "bold",
    },
    infoAmount: {
        fontSize: 12,
        color: "black",
        fontWeight: "600",
    },
    imageArea: {
        flex: 1,
    },
    vehicleImage: {
        position: "absolute",
        top: -15,
        left: -15,
        width: "140%",
        height: "140%",
    },
});
