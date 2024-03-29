import React, { useState } from "react";
import { HStack, Text, VStack, useToast, Icon, Button, Box, Divider, ScrollView, useDisclose, Actionsheet, Switch, Checkbox, View } from "native-base";
import { TouchableOpacity } from "react-native";

import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { Photo } from "../components/Photo";
import { useAuth } from "../hooks/useAuth";
import { CardActiveAds } from "../components/CardActiveAds";
import { Input } from "../components/Input";
import { AdsImages } from "../components/AdsImages";
import { ButtonMadeUp } from "../components/ButtonMadeUp";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { CreateAds } from "./CreateAds";
import { AppNavigatorRoutesProp } from "src/routes/app.routes";

export function Home() {

    const { user } = useAuth();
    const[userPhoto, setUserPhoto] = useState("https://avatars.githubusercontent.com/u/114935103?s=400&u=72ff65639ede1e9b3284095b0aef27c83d5bc145&v=4");
    const {isOpen, onOpen, onClose} = useDisclose();
    const navigation = useNavigation<AppNavigatorRoutesProp>()
    const [searchAds, setSearchAds] = useState("");

    function goToCreateAds() {  
        navigation.navigate("createAds")
    }

    function HandleAdsSearch(text: string) {
        setSearchAds(text)
    }


    //invalid hook call se você chamar a função de outra tela para 
    return(
        <VStack  flex={1} paddingLeft={6} paddingRight={5} bgColor="gray.600">

            <HStack marginTop={16}>
                    {/* <Photo 
                    size={12} 
                    source={ user.avatar
                        ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
                        : AvatarImageDefault}
                    /> */}
                    <Photo size={52} source={{uri: userPhoto}} />

                <VStack paddingLeft={2}>
                    <Text color="gray.100" fontSize="md" fontFamily="body">
                        Boas vindas, 
                    </Text>
                    <Text color="gray.100" fontSize="md" fontFamily="heading">
                        {user.name}!
                    </Text>
                </VStack>
                    
                <Button w={135} bgColor="gray.100" ml={16} onPress={goToCreateAds}>
                    <HStack flexDirection="row" alignItems="center">
                        <Icon
                        as={Ionicons}
                        name="add"
                        size={22}
                        color="gray.600"
                        />
                        <Text color="gray.600" pl={1}>Criar anúncio</Text>
                    </HStack>    
                </Button>

            </HStack>

                <Text pt={5} pb={2} color="gray.300" fontFamily="body" fontSize="sm">
                    Seus produtos anunciados para venda
                </Text>

                <CardActiveAds />               

                <Text pt={5} color="gray.300">
                    Compre produtos variados
                </Text>

            <HStack alignItems="center" pr={16}>
                    <Input 
                    w={345} 
                    mt={2}
                    placeholder="Buscar anúncio"
                    value={searchAds}
                    onChangeText={(text) => setSearchAds(text)}
                    />
                        <Icon
                        as={Feather}
                        name="search"
                        size={18}
                        color="gray.200"
                        ml={2}
                        />

                        <Divider bg="gray.100" thickness="1" orientation="vertical" mx={1} h={4}/>

                        <TouchableOpacity onPress={onOpen}> 
                            <Icon 
                            as={AntDesign}
                            name="filter"
                            size={18}
                            color="gray.200"
                            />
                        </TouchableOpacity>
                <VStack>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                    <Box w="100%" px={5}>
                    <HStack justifyContent="space-between">
                        <Text fontFamily="heading" fontSize={20}>
                            Filtrar Anúncios
                        </Text>
                        <Feather name="x" size={24} color="gray.400" onPress={onClose}/>
                    </HStack>

                    <Text color="gray.300" fontWeight={700} fontFamily="body" fontSize={14} my={3}>Condições:</Text>
                    <HStack pb={6}>
                        <ButtonMadeUp borderRadius={50} mr={2} title={"NOVO"} variante={"gray.500"} colors={"gray.200"} w={20}/>
                        <ButtonMadeUp borderRadius={50} mr={2} title={"USADO"} variante={"gray.500"} colors={"gray.200"} w={20}/>
                    </HStack>

                    <Text color="gray.300" fontWeight={700} fontFamily="body" fontSize={14}>Aceita troca?</Text>
                    <Box pr={285} mb={4}>
                    <Switch size="lg" colorScheme="blueGray"/>
                    </Box>

                    <Text color="gray.300" fontWeight={700} fontFamily="body" fontSize={14} mb={4}>Meios de pagamentos aceitos:</Text>
                    <Checkbox value="one" mb={1}>Boleto</Checkbox>
                    <Checkbox value="one" mb={1}>Pix</Checkbox>
                    <Checkbox value="one" mb={1}>Dinheiro</Checkbox>
                    <Checkbox value="one" mb={1}>Cartão de Crédito</Checkbox>
                    <Checkbox value="one" mb={1}>Depósito Bancário</Checkbox>

                    <HStack pt={10} mb={3}>
                        <ButtonMadeUp title="Resetar filtros" variante="gray.500" colors="gray.200" w={40} mr={3}/>
                        <ButtonMadeUp title="Aplicar filtros" variante="gray.100" colors="gray.700" w={40}/>
                    </HStack>
                    </Box>
                    </Actionsheet.Content>
                </Actionsheet>
              </VStack>

            </HStack>

            <ScrollView>
                <AdsImages/>
            </ScrollView>
            
        </VStack>
    )
}