import React, { useState } from "react";
import { VStack, Text, HStack, Box, Center, ScrollView, Button} from "native-base";

import { AntDesign } from '@expo/vector-icons'; 

import ProductImageSVG from "../assets/ProductImage.svg"
import { Photo } from "../components/Photo";
import { ImageBackground, Touchable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "src/routes/app.routes";
import { PaymentMethods } from "../components/PaymentMethods";


export function AdsDetails() {

    const[userPhoto, setUserPhoto] = useState("https://images.pexels.com/photos/17897079/pexels-photo-17897079/free-photo-of-adulto-garoto-menino-rapaz.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    const navigation = useNavigation<AppNavigatorRoutesProp>();

    function goBackToHome()  {
        navigation.navigate("home")
    }

    return(
        <VStack mt={10} >
            <VStack mb={3} ml={6}>
                <TouchableOpacity onPress={goBackToHome}>
                    <AntDesign name="arrowleft" size={26} color={"gray.100"} />
                </TouchableOpacity>
            </VStack>
            <ScrollView>

            <Center borderColor="blueGray.100">
                <ProductImageSVG/>
            </Center>
            
            <VStack>
                <HStack alignItems="center">
                    <Photo size={12} source={{uri: userPhoto}} mt={6} ml={6}/>
                    <Text ml={6} mt={3} fontFamily="heading" fontSize={16}>
                        Makenji Batista
                    </Text>
                </HStack>
            </VStack>
        
            <Box bgColor={"gray.200"} borderRadius={50} position="absolute" zIndex={1} top={380} right={80}>
                <Text color={"gray.700"} p={1} fontSize={12}>USADO</Text>
            </Box>
          
            <HStack mt={16} ml={6} justifyContent="space-between" pr={6}>
                <Text fontFamily="heading" fontSize={20} color={"gray.200"}>
                    Bicicleta
                </Text> 
                <Text fontFamily="heading" fontSize={20} color={"blue.200"}>
                    R$ 120,00
                </Text>
            </HStack>
            <VStack>
                <Text p={6} textAlign="justify">
                Cras congue cursus in tortor sagittis placerat nunc,
                tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. 
                Mauris metus amet nibh mauris mauris accumsan, euismod. 
                Aenean leo nunc, purus iaculis in aliquam.
                </Text>
            </VStack>
            <HStack ml={6}>
                <Text color={"black"} fontFamily="heading">
                    Aceita troca?  
                </Text>
                <Text pl={2}>
                    Não
                </Text>
            </HStack>

            <PaymentMethods/>

            <HStack mb={20}>
                <Text ml={8} fontFamily="heading" fontSize={20} color={"blue.100"}>
                    R$ 120,00
                </Text>
                <TouchableOpacity>
                    <Button ml={24} bgColor={"blue.200"}>
                        Entrar em contato
                    </Button>
                </TouchableOpacity>

            </HStack>
            
            </ScrollView>
        </VStack>
    )
}