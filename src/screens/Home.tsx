import React from "react";
import { HStack, Text, VStack, useToast, Icon, Button, Box } from "native-base";
import { TouchableOpacity } from "react-native";

import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FileInfo } from "expo-file-system";
import { ImagePickerSuccessResult } from "expo-image-picker";

import { Photo } from "../components/Photo";
import { useAuth } from "../hooks/useAuth";
import { CardActiveAds } from "../components/CardActiveAds";
import { Input } from "../components/Input";
import { AppError } from "../utils/AppError";
import { api } from "../services/api";
import { AvatarImageDefault }  from "../assets/Avatar.png";
import { AdsImages } from "../components/AdsImages";
import { FilterAds } from "./FilterAds";

export function Home() {

    const { user } = useAuth();
        
    
    
    return(
        <VStack  flex={1} paddingLeft={6} paddingRight={5} bgColor="gray.600">

            <HStack marginTop={16}>

                    <Photo 
                    size={12} 
                    src={ user.avatar
                        ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
                        : AvatarImageDefault}
                    />

                <VStack paddingLeft={2}>
                    <Text color="gray.100" fontSize="md" fontFamily="body">
                        Boas vindas, 
                    </Text>
                    <Text color="gray.100" fontSize="md" fontFamily="heading">
                        {user.name}
                    </Text>
                </VStack>
                    
                <Button w={135} bgColor="gray.100" ml={16}>
                    <HStack flexDirection="row" alignItems="center">
                        <Icon
                        as={Ionicons}
                        name="add"
                        size={22}
                        color="gray.600"
                        />
                        <Text color="gray.600" pl={2}>Criar anúncio</Text>
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
                    />
                        <Icon
                        as={Feather}
                        name="search"
                        size={18}
                        color="gray.200"
                        ml={2}
                        />
                        <TouchableOpacity onPress={FilterAds}> 
                            <Icon 
                            as={AntDesign}
                            name="filter"
                            size={18}
                            color="gray.200"
                            />
                        </TouchableOpacity>
                </HStack>

            <AdsImages/>
        
            
        </VStack>
        //ONPRESS DO TOUCHABLE FILTER FAZER FUNCTION ABRIR SCREEN FILTRO
    )
}