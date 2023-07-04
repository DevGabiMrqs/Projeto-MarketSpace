import React, { useState } from "react";
import { Button, HStack, Text, VStack, useToast, Icon, Link } from "native-base";
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FileInfo } from "expo-file-system";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { TouchableOpacity } from "react-native";

import { Photo } from "../components/Photo";
import { AppError } from "../utils/AppError";
import { useAuth } from "../hooks/useAuth";
import { CardActiveAds } from "../components/CardActiveAds";


export function Home() {

    const [photoIsLoading, setPhotoIsLoading] = useState(true);
    const [ userPhoto, setUserPhoto] = useState("https://avatars.githubusercontent.com/u/114935103?s=400&u=72ff65639ede1e9b3284095b0aef27c83d5bc145&v=4");
    const[avatar, setAvatar] = useState<ImagePickerSuccessResult>({} as ImagePickerSuccessResult);
    const toast = useToast();

    const { user } = useAuth();

    
    async function handleUserPhotoSelect(){}     
    

    return(
        <VStack paddingLeft={6} paddingRight={5}>

            <HStack marginTop={16} >
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

                <Button backgroundColor="gray.100" fontFamily="heading" ml={16} w={139} h={42}>
                    Criar anúncio
                </Button>
            </HStack>

            <Text pt={5} pb={2} color="gray.300" fontFamily="body" fontSize="sm">
                Seus produtos anunciados para venda
            </Text>

        <CardActiveAds />

        </VStack>
    )
}