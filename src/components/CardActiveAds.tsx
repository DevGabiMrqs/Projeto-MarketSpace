import React from "react";
import { HStack, VStack, Text, Icon, View, Box } from "native-base";
import { Feather, AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { MyAds } from "../screens/MyAds";

export function CardActiveAds() {

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
                <TouchableOpacity>
                    <HStack alignItems="center">
                        <Text color="blue.100" fontFamily="heading" fontSize={12} onPress={MyAds}>
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