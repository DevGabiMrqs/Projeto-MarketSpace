import React from "react";
import { Button, HStack, Text, VStack, View } from "native-base";
import { Photo } from "../components/Photo";
import { TouchableOpacity } from "react-native-gesture-handler";


export function Home() {



    return(
        <HStack marginTop={16} marginLeft={6}>
            <View>
                <Photo size={12}/>
            </View>
            <VStack paddingLeft={2}>
                <Text color="gray.100" fontSize="md" fontFamily="body">
                    Boas vindas, 
                </Text>
                <Text color="gray.100" fontSize="md" fontFamily="heading">
                    Teste!
                </Text>
            </VStack>
            <Button backgroundColor="gray.100" fontFamily="heading" ml={16} w={139} h={42}>
                Criar anúncio
            </Button>
        </HStack>
    )
}