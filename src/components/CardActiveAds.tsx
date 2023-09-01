import React from "react";
import { HStack, VStack, Text, Icon, View, Box } from "native-base";
import { TouchableOpacity } from "react-native";

import { Feather, AntDesign } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProp } from "src/routes/app.routes";


export function CardActiveAds() {
    const navigation = useNavigation<AppNavigatorRoutesProp>()

    function goToMyAds() {
        navigation.navigate("myAds")
    }

    return(
        <HStack flexDirection="row" alignItems="center" bgColor="blueGray.200" borderRadius={6}>
            <Icon
            as={Feather} 
            name="tag" 
            color="gray.100"
            size={22.8}
            m={6}
            />
            <VStack>
                <Text fontFamily="heading" fontSize={20}>
                    4
                </Text>
                <Text>
                    anúncios ativos
                </Text>
            </VStack>
            <Box pl={12} >
                <TouchableOpacity onPress={goToMyAds} >
                    <HStack alignItems="center">
                        <Text color="blue.100" fontFamily="heading" fontSize={12}>
                            Meus anúncios
                        </Text>
                        <Icon 
                        as={AntDesign}
                        name="arrowright"
                        size={4}
                        color="blue.100"
                        ml={2}
                        />
                    </HStack>
                </TouchableOpacity>
            </Box>
        </HStack>
    )
}