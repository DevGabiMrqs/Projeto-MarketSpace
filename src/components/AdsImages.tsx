import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import { HStack, Text, Image, VStack, Box, ScrollView} from "native-base"

import { useNavigation } from "@react-navigation/native"

import { Photo } from "./Photo"
import { AppNavigatorRoutesProp } from "../routes/app.routes"

import BikePNG from "../assets/Bike.png"
import UserSVG from "../assets/User.svg"

export function AdsImages() {

    const navigation = useNavigation<AppNavigatorRoutesProp>()
    const[userPhoto, setUserPhoto] = useState("https://images.pexels.com/photos/17897079/pexels-photo-17897079/free-photo-of-adulto-garoto-menino-rapaz.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")

    function goToDetailsOftheAds() {
    navigation.navigate("adsDetails")
    }


    return (
        <VStack>
            <HStack justifyContent="space-between" m={2}>

                <VStack position="relative">
                    <TouchableOpacity onPress={goToDetailsOftheAds}>
                        <Box position="absolute" zIndex={1} top={1} left={1}>
                            <Photo size={34} source={{uri: userPhoto}} />
                        </Box>

                        <Box bgColor="gray.200" borderRadius={50} position="absolute" zIndex={1} top={1} right={1}>
                            <Text color="gray.700" p={1} fontSize={12}>USADO</Text>
                        </Box>

                        <Box>
                            <Image
                            alt="Imagem do anúncio"
                            bgColor="blue.300"
                            width={153}
                            height={120}
                            borderRadius={10}
                            source={BikePNG}
                            /> 
                        </Box>
                    </TouchableOpacity>

                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Bicicleta
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 120,00
                        </Text>
                </VStack>
          

{/*             
                <VStack position="relative">

                    <TouchableOpacity onPress={goToDetailsOftheAds}>
                        <Box position="absolute" zIndex={1} top={1} left={1}>
                            <Photo size={8}/>
                        </Box>

                        <Box bgColor="blue.100" borderRadius={50} position="absolute" zIndex={1} top={1} right={1}>
                            <Text color="gray.700" p={1} fontSize={12}>NOVO</Text>
                        </Box>

                        <Box>
                            <Image
                            alt="Imagem do anúncio"
                            bgColor="blue.300"
                            width={153}
                            height={120}
                            borderRadius={10}
                            /> 
                        </Box>
                    </TouchableOpacity>
                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Tênis Vermelho
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 59,90
                        </Text>
                </VStack> */}

            </HStack>
           
        </VStack>
    )
}