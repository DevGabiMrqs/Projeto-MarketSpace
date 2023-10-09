import React from "react";
import { HStack, VStack, Text, Icon, Center, Box, Image, Select, CheckIcon } from "native-base";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProp } from "src/routes/app.routes";
import LampPNG from "../assets/Lamp.png"
import BootsPNG from "../assets/Boots.png"
import TShirtPNG from "../assets/TShirt.png"
import ComodaPNG from "../assets/Comoda.png"


export function MyAds() {

    const navigation = useNavigation<AppNavigatorRoutesProp>()
    const [typeOfFilter, setTypeOfFilter] = React.useState("")

    function goToDetailsOfMyAds(){
        navigation.navigate("detailsOfMyAds")
    }

    return(
        <VStack >
                <HStack mt={10}>
                        <Text fontFamily="heading" ml={32} fontSize={20}>
                            Meus anúncios
                        </Text>
                    <TouchableOpacity>
                        <Icon
                        as={MaterialIcons}
                        name="add"
                        size={23}
                        color="gray.100"
                        mt={1}
                        ml={16}
                        />
                    </TouchableOpacity>
                </HStack>
            <HStack>
                <Text mt={8} ml={9}>
                    4 anúncios
                </Text>
                <Select mt={6} ml={32}  selectedValue={typeOfFilter} fontSize="md" w={32} h={8} accessibilityLabel="Filtro" placeholder="Todos"placeholderTextColor={"gray.100"}  _selectedItem={{
                    bg: "gray.600",
                }} onValueChange={itemValue => setTypeOfFilter(itemValue)}>
                    <Select.Item label="Todos" value="todos" />
                    <Select.Item label="Novo" value="novo" />
                    <Select.Item label="Usado" value="usado" />
                    </Select>
            </HStack>

            <VStack mt={8}>
            <HStack justifyContent="space-between" mx={8}>

                <VStack position="relative">
                    <TouchableOpacity onPress={goToDetailsOfMyAds}>
                        {/* <Box position="absolute" zIndex={1} top={1} left={1}>
                            <Photo size={34} source={{uri: userPhoto}} />
                        </Box> */}

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
                            source={LampPNG}
                            /> 
                        </Box>
                    </TouchableOpacity>

                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Luminária pendente
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 60,00
                        </Text>
                </VStack>
                   
                <VStack position="relative">

                    <TouchableOpacity onPress={goToDetailsOfMyAds}>
                        {/* <Box position="absolute" zIndex={1} top={1} left={1}>
                            <Photo size={8}/>
                        </Box> */}

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
                            source={BootsPNG}
                            /> 
                        </Box>
                    </TouchableOpacity>
                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Coturno Feminino
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 89,00
                        </Text>
                </VStack> 
            </HStack>
           

        <VStack mt={4}>
            <HStack justifyContent="space-between" mx={8}>

                <VStack position="relative">
                    <TouchableOpacity onPress={goToDetailsOfMyAds}>
                        {/* <Box position="absolute" zIndex={1} top={1} left={1}>
                            <Photo size={34} source={{uri: userPhoto}} />
                        </Box> */}

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
                            source={TShirtPNG}
                            /> 
                        </Box>
                    </TouchableOpacity>

                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            T-Shirt
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 20,00
                        </Text>
                </VStack>
                   
                <VStack position="relative">

                    <TouchableOpacity onPress={goToDetailsOfMyAds}>
                        {/* <Box position="absolute" zIndex={1} top={1} left={1}>
                            <Photo size={8}/>
                        </Box> */}

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
                            source={ComodaPNG}
                            /> 
                        </Box>
                    </TouchableOpacity>
                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Cômoda
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 50,00
                        </Text>
                </VStack> 

            </HStack>
           
        </VStack>
        </VStack>
        </VStack>
    )
}
