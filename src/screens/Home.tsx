import React, { useState } from "react";
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
import { FilterAds } from "../screens/FilterAds";

export function Home() {

    const[userPhoto, setUserPhoto] = useState("AvatarSvg");

    const toast = useToast();
    const { user } = useAuth();

    //Melhor manter o padrão de só chamar a foto e não atualizá-la aqui.
    async function handleUserPhotoSelect(){

        try {
            
            
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true

        })
        
        if(photoSelected.canceled) {
            return;
        }
        
        if(photoSelected.assets[0].uri){
            setUserPhoto(photoSelected.assets[0].uri)
            
            const photoInfo:FileInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
            
            if(photoInfo.exists && !photoInfo.isDirectory) {
                if(photoInfo.size && (photoInfo.size /1024 /1024) > 5)
                
                return toast.show({
                    title: "Por favor escolha uma foto menor que 5MB.",
                    placement: "top",
                    bgColor: "red.600"
                })
            }  
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();
         
        const photoFile = {
            name: `${user.name}.${fileExtension}`.toLowerCase(),
            uri: photoSelected.assets[0].uri,
            type: "image"
          } as any;

        setUserPhoto(photoFile)

        } catch (error) {

            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar a foto"

            toast.show({
                title,
                placement: "top",
            })   
        
        }
        
    }     
    

    return(
        <VStack  flex={1} paddingLeft={6} paddingRight={5} bgColor="gray.600">

            <HStack marginTop={16}>
                <TouchableOpacity onPress={handleUserPhotoSelect}>
                    <Photo size={12}/>
                </TouchableOpacity>

                <VStack paddingLeft={2}>
                    <Text color="gray.100" fontSize="md" fontFamily="body">
                        Boas vindas, 
                    </Text>
                    <Text color="gray.100" fontSize="md" fontFamily="heading">
                        teste!
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
        </VStack>
        //ONPRESS DO TOUCHABLE FILTER FAZER FUNCTION ABRIR SCREEN FILTRO
    )
}