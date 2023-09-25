import React from "react";
import { HStack, ScrollView, VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "../routes/app.routes";



export function CreateAds() {

const navigation = useNavigation<AppNavigatorRoutesProp>();

function goBackToHome()  {
    navigation.goBack()
}

return(
    <ScrollView>
        <VStack paddingTop={10} pl={8}>
            <HStack>
                <TouchableOpacity onPress={goBackToHome}>
                    <AntDesign name="arrowleft" size={26} color="gray.100" />
                </TouchableOpacity>
                <Text ml={20} fontSize={20} fontFamily="heading">
                    Criar anúncio
                </Text>
            </HStack>
            <Text mt={6} fontFamily="heading" color={"gray.100"} fontSize={16}>Imagens</Text>
            <Text mt={2} fontFamily="body" fontSize={14} color="gray.200">
                Escolha até 3 imagens para mostrar o quanto seu 
                produto é incrível!
            </Text>
            
        </VStack>
    </ScrollView>
)}

