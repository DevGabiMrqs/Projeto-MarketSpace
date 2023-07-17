import React from "react";
import { HStack, VStack, Text, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 


export function MyAds() {


    return(
        <>
        <VStack>
            <HStack> 
                <Text>
                    Meus anúncios
                </Text>
                <TouchableOpacity>
                    <Icon
                    as={MaterialIcons}
                    name="add"
                    size={22}
                    color="gray.100"
                    />
                </TouchableOpacity>
            </HStack>
        </VStack>
        </>
    )
}
