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
        <VStack>
            <HStack>
                <TouchableOpacity onPress={goBackToHome}>
                    <AntDesign name="arrowleft" size={26} color="gray.100" />
                </TouchableOpacity>
                <Text pl={8}>
                    Criar anúncio
                </Text>
            </HStack>
            <Text>Imagens</Text>
            <Text>
                Escolha até 3 imagens para mostrar o quanto seu 
                produto é incrível!
            </Text>
        </VStack>
    </ScrollView>
)}