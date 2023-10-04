import React, { useState } from "react";
import { HStack, ScrollView, VStack, Text, useToast, Stack, TextArea, Radio, Switch, Image } from "native-base";
import { SwitchBase, TouchableOpacity, View } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FileInfo } from "expo-file-system";
import { ImagePickerSuccessResult } from "expo-image-picker";

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProp } from "../routes/app.routes";
import { AppError } from "../utils/AppError";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { PaymentMethods } from "../components/PaymentMethods";

type FormDataPropss = {
    product_id: string;
    avatar: string;
}

export function CreateAds() {

const navigation = useNavigation<AppNavigatorRoutesProp>();
const [avatar, setAvatar] = useState<ImagePickerSuccessResult>({} as ImagePickerSuccessResult)
const [photoIsLoading, setPhotoIsLoading] = useState(false)
const [productPhoto, setProductPhoto] = useState<any>();
//const [value, setValue] = useState();

const toast = useToast();

function goBackToHome()  {
    navigation.goBack()
}

async function handleProductPhoto(){
       
try {
        setPhotoIsLoading(true)

        const photoSelected = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.Images, 
             quality: 1,
             aspect: [4, 4],
             allowsEditing:true
        })

        if(photoSelected.canceled){ 
             return;
        }

        if(photoSelected.assets[0].uri) {
            setProductPhoto(photoSelected.assets[0].uri)
            const photoInfo:FileInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
             
            if(photoInfo.exists && !photoInfo.isDirectory) { 
                 if(photoInfo.size && (photoInfo.size /1024 / 1024) > 5)
                 return  toast.show({
                     title: "Por favor escolha uma foto menor que 5MB.",
                     placement: "top",
                     bgColor: "red.600"
                })
            }
        }

         setAvatar(photoSelected);

    } catch (error) {
         
        const isAppError = error instanceof AppError;
        setPhotoIsLoading(false)
        const title = isAppError ? error.message : "Não foi possível carregar a foto"

        toast.show({
             title,
             placement: "top",
        })    
    }
} 
// async function showProductPhoto() {

//     try {

//     const fileExtension = avatar.assets[0].uri.split('.').pop();

//     const photoFile = {
//         name:`${fileExtension}`.toLocaleLowerCase(),
//         uri: avatar.assets[0].uri,
//         type: `${avatar.assets[0].uri}/${fileExtension}`
//     } as any;

//     const formData = new FormData()

//     formData.append("avatar", photoFile)

//     const headers = {
//         "Content-type": "multipart/form-data"
//     }

//     const response = await api.post("/products/images", formData, {headers})
//     console.log(response)
    
    
//     } catch (error) {
    
//     }
 

async function createNewAds() {
    //enviar imagem, título, descrição, valor
}

return (
    <ScrollView paddingTop={10} pl={8}>
        <VStack>
            <HStack>
                <TouchableOpacity onPress={goBackToHome}>
                    <AntDesign name="arrowleft" size={26} color="gray.100" />
                </TouchableOpacity>
                <Text ml={20} fontSize={20} fontFamily="heading">
                    Criar anúncio
                </Text>
            </HStack>

            <Text mt={6} fontFamily="heading" color="gray.100" fontSize={16}>Imagens</Text>
            <Text mt={2} fontFamily="body" fontSize={14} color="gray.200">
                Escolha até 3 imagens para mostrar o quanto seu 
                produto é incrível!
            </Text>
        </VStack>


        <HStack>
        {/* if ternário pra selecionar a imagem */}
        { productPhoto ? 
        (<Image 
            borderRadius={6} 
            mt={4} 
            w={100} 
            h={100} 
            source={{ uri: productPhoto }} 
            alt="Foto do Produto"
            />
        ) : (
            <TouchableOpacity onPress={handleProductPhoto}>
                    <Stack backgroundColor="gray.500" borderRadius={6} mt={4} w={100} h={100} alignItems="center" justifyContent="center">
                        <AntDesign
                            name="plus"
                            size={26}
                            color="gray" />
                    </Stack>
            </TouchableOpacity>
        )}
        </HStack>


        <Text mt={6} fontFamily="heading" color="gray.100" fontSize={16}>Sobre o Produto</Text>
        <Input w={325} mt={2} placeholder="Título do anúncio"/>
        <TextArea autoCompleteType={undefined} 
        backgroundColor="gray.700" 
        borderRadius={6} 
        borderColor="gray.700"
        placeholder="Descrição do produto"
        fontSize={16}
        placeholderTextColor="gray.400"
        mr={8}
        />

        <Radio.Group name={""} isDisabled>
        <HStack mt={4}>  
            <Radio value="newProduct" colorScheme="purple">
                Produto Novo
            </Radio>
            <Radio value="oldProduct" ml={6} colorScheme="purple">
                Produto Usado
            </Radio>
        </HStack>
        </Radio.Group>

        <Text mt={6} fontFamily="heading" color="gray.100" fontSize={16}>Venda</Text>

        <Input
        w={325} 
        mt={2}
        placeholder="Valor do Produto"
        />

        <Text mt={4} fontFamily="heading" color="gray.100" fontSize={16}>Aceita Troca?</Text>
        <Switch size="lg" mr={80} colorScheme="purple"/>



    </ScrollView>
)}

