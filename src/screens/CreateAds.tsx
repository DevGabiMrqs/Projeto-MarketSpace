import React, { useState } from "react";
import { HStack, ScrollView, VStack, Text, useToast, Stack, TextArea, Radio, Switch, Image, Checkbox } from "native-base";
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
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonMadeUp } from "../components/ButtonMadeUp";


type productProps = {
    name: string;
    description: string;
    is_new: string;
    price: string;
    accept_trade: string;
    payment_methods: string;
}

const createAdsSchema = yup.object({
    name: yup.string().required("Informe o título do anúncio."),
    description: yup.string().required("Informe a descrição do produto."),
    is_new: yup.string().required("Informe se o produto é novo ou usado."),
    price: yup.string().required("Informe o valor do produto."),
    accept_trade: yup.string().required("Informe se aceita troca ou não."),
    payment_methods: yup.string().required("Informe um ou mais métodos de pagamento.")
})


export function CreateAds() {

const navigation = useNavigation<AppNavigatorRoutesProp>();
const [avatar, setAvatar] = useState<ImagePickerSuccessResult>({} as ImagePickerSuccessResult)
const [photoIsLoading, setPhotoIsLoading] = useState(false)
const [productPhoto, setProductPhoto] = useState<ImagePickerSuccessResult[]>([]);

const { control, handleSubmit, formState : errors } = useForm<productProps>({
    resolver: yupResolver(createAdsSchema)
})

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
            //setProductPhoto(photoSelected.assets[0].uri)
            const photoInfo:FileInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
             
            if(photoInfo.exists && !photoInfo.isDirectory) { 
                 if(photoInfo.size && (photoInfo.size /1024 / 1024) > 5)
                 return  toast.show({
                     title: "Por favor escolha uma foto menor que 5MB.",
                     placement: "top",
                     bgColor: "red.600"
                })
            }
            setProductPhoto((prevPhotos) => [...prevPhotos, photoSelected]);
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

async function createAd({name, description, is_new, price, accept_trade, payment_methods}:productProps){

    try {

    const fileExtension = avatar.assets[0].uri.split('.').pop();

    const photoFile = {
        name:`${fileExtension}`.toLocaleLowerCase(),
        uri: avatar.assets[0].uri,
        type: `${avatar.assets[0].uri}/${fileExtension}`
    } as any;

    const formData = new FormData()

    formData.append("avatar", photoFile),
    formData.append("name", name),
    formData.append("description", description),
    formData.append("is_new", is_new),
    formData.append("price", price),
    formData.append("accept_trade", accept_trade),
    formData.append("payment_methods", payment_methods)

    const headers = {
        "Content-type": "multipart/form-data"
    }

    const response = await api.post("/products", formData, {headers})
    console.log(response.data)
    
    
    } catch (error) {

        const isAppError = error instanceof AppError;
        const title = isAppError? error.message :"Não foi possível criar o anúncio tente novamente mais tarde"
        
        toast.show({
            title,
            placement: "top",
            bgColor: "red.100"
        })
    }
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

            <Text mt={6} fontFamily="heading" color={"gray.100"} fontSize={16}>Imagens</Text>
            <Text mt={2} fontFamily="body" fontSize={14} color={"gray.100"}>
                Escolha até 3 imagens para mostrar o quanto seu 
                produto é incrível!
            </Text>


        <HStack>

        {productPhoto.map((photo, index) => (
        <Image borderRadius={6} mt={4} w={100} h={100} ml={1} source={{ uri: photo.assets[0].uri }} alt={`Foto ${index}`}/>
        ))}
        {productPhoto.length < 3 && (
            <TouchableOpacity onPress={handleProductPhoto}>
            <Stack backgroundColor="gray.500" borderRadius={6} mt={4} w={100} h={100} ml={1} alignItems="center" justifyContent="center">
                <AntDesign
                    name="plus"
                    size={26}
                    color="gray" />
            </Stack>
            </TouchableOpacity>
        )}
        </HStack>

        <Text mt={6} fontFamily="heading" color={"gray.100"} fontSize={16}>Sobre o Produto</Text>

        <Controller
        control={control}
        name="name"
        render={({field: {onChange, value} }) => (
            <Input 
            w={325} 
            mt={2} 
            placeholder="Título do anúncio"
            onChange={onChange}
            value={value}
            />
        )}
        />    

        <TextArea 
        autoCompleteType={undefined} 
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

        <Text mt={6} fontFamily="heading" color={"gray.100"} fontSize={16}>Venda</Text>
        <Input
        w={325} 
        mt={2}
        placeholder="R$ Valor do Produto"
        keyboardType={"numeric"}
        />

        <Text mt={4} fontFamily="heading" color="gray.100" fontSize={16}>Aceita Troca?</Text>
        <Switch 
        size="lg" 
        mr={80}
        ml={16} 
        colorScheme="purple"
        />

        <Text mt={4} fontFamily="heading" color="gray.100" fontSize={16}>Meios de pagamento aceitos</Text>
        <Checkbox value={"boleto"} color={"blue.200"} mt={4}>
            Boleto
        </Checkbox>
        <Checkbox value={"pix"} color={"blue.200"} mt={2}>
            Pix
        </Checkbox>
        <Checkbox value={"dinheiro"} color={"blue.200"} mt={2}>
            Dinheiro
        </Checkbox>
        <Checkbox value={"cartaoCredito"} color={"blue.200"} mt={2}>
            Cartão de Crédito
        </Checkbox>
        <Checkbox value={"depositoBancario"} color={"blue.200"} mt={2} >
            Depósito Bancário
        </Checkbox>

        <HStack mt={6} mb={16}>
            <ButtonMadeUp 
            title={"Cancelar"} 
            w={40} 
            variante={"gray.500"} 
            colors={"gray.200"}
            />

            <ButtonMadeUp
            onPress={handleSubmit(createAd)}
            title={"Avançar"}
            w={40} 
            variante={"gray.100"} 
            colors={"gray.700"} 
            ml={2}
            />
        </HStack>

        </VStack>
    </ScrollView>
)}

