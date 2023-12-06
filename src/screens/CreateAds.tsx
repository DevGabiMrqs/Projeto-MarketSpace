import React, { useState } from "react";
import { HStack, ScrollView, VStack, Text, useToast, Stack, TextArea, Radio, Switch, Image, Checkbox} from "native-base";
import { TouchableOpacity } from "react-native";

import * as yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FileInfo } from "expo-file-system";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppNavigatorRoutesProp } from "../routes/app.routes";
import { AppError } from "../utils/AppError";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { ButtonMadeUp } from "../components/ButtonMadeUp";
import { THEME } from "../theme/index";

type ProductProps = {
    name: string;
    description: string;
    is_new: string;
    price: string;
    accept_trade: string;
    payment_methods: string;
}

type ProductPhotoProps = {
    path: string;
    product_id: string;
}

const createAdsSchema = yup.object({
    name: yup.string().required("Informe o título do anúncio."),
    price: yup.string().required("Informe o valor do produto."),
    payment_methods: yup.string().required("Informe um ou mais métodos de pagamento.")
})

export function CreateAds() {

const navigation = useNavigation<AppNavigatorRoutesProp>();
const [photoIsLoading, setPhotoIsLoading] = useState(false)
const [photoFile, setPhotoFile] = useState<ImagePickerSuccessResult | null>(null);
const [productPhoto, setProductPhoto] = useState<ImagePickerSuccessResult[]>([]);
const toast = useToast();
const { control, handleSubmit, reset, formState : {errors} } = useForm<ProductProps>({
    resolver: yupResolver(createAdsSchema)
})

const handleCancel = () => { 
    reset();
    setProductPhoto([]);
    setPhotoFile(null);
};


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

         setPhotoFile(photoSelected);

    } catch (error) {

        setPhotoIsLoading(false)
         
        const isAppError = error instanceof AppError;
        const title = isAppError ? error.message : "Não foi possível carregar a foto"

        toast.show({
            title,
            placement: "top",
        })    
    }
}



async function sendProductImage({path, product_id}: ProductPhotoProps) {

    setPhotoIsLoading(true)

    try {
        
    const fileExtension = photoFile?.assets[0].uri.split('.').pop() || " ";
   
     
    const photoFilefile = {
        name:`${fileExtension}`.toLocaleLowerCase(),
        uri: productPhoto[0]?.assets[0].uri,
        type: `image/${fileExtension}`
    } as any;
        
    const formData = new FormData();
    formData.append("path", photoFilefile[0]?.assets[0].uri || " " );
    formData.append("product_id", product_id);


    const headers = {
        "Content-Type": "multipart/form-data"
    }

    const response = await api.post("/products/images/", formData, { headers })
    console.log(response.data)


    } catch (error) {
        
        setPhotoIsLoading(false)

        const isAppError = error instanceof AppError;
        const title = isAppError? error.message :"Não foi possível criar o anúncio tente novamente mais tarde."
        
        
        toast.show({
            title,
            placement: "top",
            bgColor: "red.100"
        })
    }
    
}

async function createAd({name, description, is_new, price, accept_trade, payment_methods}:ProductProps){

    try {

    setPhotoIsLoading(true)

    const formData = new FormData()

    formData.append("name", name);
    formData.append("description", description);
    formData.append("is_new", is_new);
    formData.append("price", price);
    formData.append("accept_trade", accept_trade);
    formData.append("payment_methods", payment_methods);

    const headers = {

        "Content-Type": "multipart/form-data"
    }

    const response = await api.post("/products", formData, {headers})
    await sendProductImage({path: photoFile?.assets[0].uri || " ", product_id: response.data.id})
    console.log(response.data)
    console.log("teste");
    
    
    
    } catch (error) {

        setPhotoIsLoading(false)

        const isAppError = error instanceof AppError;
        const title = isAppError? error.message :"Não foi possível criar o anúncio tente novamente mais tarde!!!"
        
        
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
                    <AntDesign name="arrowleft" size={26} color={THEME.colors.gray[100]} />
                </TouchableOpacity>
                <Text ml={20} fontSize={20} fontFamily="heading">
                    Criar anúncio
                </Text>
            </HStack>

            <Text mt={6} fontFamily="heading" color={THEME.colors.gray[100]} fontSize={16}>Imagens</Text>
            <Text mt={2} fontFamily="body" fontSize={14} color={THEME.colors.gray[100]}>
                Escolha até 3 imagens para mostrar o quanto seu 
                produto é incrível!
            </Text>

        <HStack>

        <HStack>
        {productPhoto.map((photo, index) => (
            <Image
            key={index} 
            borderRadius={6} 
            mt={2} 
            w={100} 
            h={100} 
            ml={1} 
            source={{ uri: photo.assets[0].uri }} 
            alt={`Foto ${index}`}
            />
            ))}
        </HStack>
        {productPhoto.length < 3 && (
            <TouchableOpacity onPress={handleProductPhoto}>
            <Stack backgroundColor="gray.500" borderRadius={6} mt={2} w={100} h={100} ml={2} alignItems="center" justifyContent="center">
                <AntDesign
                    name="plus"
                    size={26}
                    color="gray" />
            </Stack>
            </TouchableOpacity>
        )}
        </HStack>

        <Text mt={6} fontFamily="heading" color={THEME.colors.gray[100]} fontSize={16}>Sobre o Produto</Text>

        <Controller
        control={control}
        name="name"
        render={({field: {onChange, value} }) => (
            <Input 
            w={325} 
            mt={2} 
            placeholder="Título do anúncio"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name?.message}
            />
        )}
        />

        <Controller
        control={control}
        name="description"
        render={({ field: {onChange, value} }) => (
            <TextArea 
            autoCompleteType={undefined} 
            backgroundColor="gray.700" 
            borderRadius={6}
            borderWidth={"0"}
            placeholder="Descrição do produtoo"
            fontSize={16}
            placeholderTextColor="gray.400"
            mr={8}
            onChangeText={onChange}
            value={value}
            />
        )}
        />

        <Controller 
        control={control} 
        name="is_new"
        render={({field: { onChange, value } }) => (
            <Radio.Group 
            name={"isNew"} 
            onChange={onChange} 
            value={value}>
            <HStack mt={4}>
            <Radio value={"true"} colorScheme="purple">
                Produto Novo
            </Radio>
            <Radio value={"false"} ml={10} colorScheme="purple">
                Produto Usado
            </Radio>
            </HStack>
            </Radio.Group>
        )}
        />

        <Text mt={6} fontFamily="heading" color={THEME.colors.gray[100]} fontSize={16}>Venda</Text>
        <Controller
        control={control}
        name="price"
        render={({ field: {onChange, value} }) => (
            <Input
            w={325} 
            mt={2}
            placeholder="R$ Valor do Produto"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.price?.message}
            />
        )}
        />

        <Text mt={4} fontFamily="heading" color={THEME.colors.gray[100]} fontSize={16}>Aceita Troca?</Text>
        <Controller
        control={control}
        name="accept_trade"
        defaultValue="false"
        render={({ field: { onChange, value } }) => (
            <Switch
            mr={72}
            size={"lg"}
            onValueChange={(val) => onChange(val)}
            />
        )}
        />

        <Text mt={4} fontFamily="heading" color={THEME.colors.gray[100]} fontSize={16}>Meios de pagamento aceitos</Text>
        <Controller 
        control={control}
        name="payment_methods"
        render={({ field: { onChange, value } }) => (
            <Checkbox
            onChange={onChange}
            value="boleto"
            color={"blue.200"} 
            mt={4}
            >
            Boleto
            </Checkbox>
        )}
        />

        <Controller
        control={control}
        name="payment_methods"
        render={({ field: { onChange} }) => (
            <Checkbox 
            onChange={onChange}
            value="pix" 
            color={"blue.200"} 
            mt={2}
            >
            Pix
            </Checkbox>
        )}
        />

        <Controller
        control={control}
        name="payment_methods"
        render={({ field: { onChange } }) => (
            <Checkbox 
            onChange={onChange}
            value="cash" 
            color={"blue.200"} 
            mt={2}
            >
            Dinheiro
            </Checkbox>
        )}
        />

        <Controller
        control={control}
        name="payment_methods"
        render={({ field: { onChange } }) => (
            <Checkbox 
            onChange={onChange}
            value="card"
            color={"blue.200"} 
            mt={2}
            >
            Cartão de crédito
            </Checkbox>
        )}
        />

        <Controller
        control={control}
        name="payment_methods"
        render={({ field: { onChange } }) => (
            <Checkbox 
            onChange={onChange}
            value="deposit" 
            color={"blue.200"} 
            mt={2}
            >
            Depósito bancário
            </Checkbox>
        )}
        />          

        <HStack mt={6} mb={16}>
            <ButtonMadeUp 
            title="Cancelar" 
            w={40} 
            variante="gray.500"
            colors="gray.200"
            onPress={handleCancel}
            />

            <ButtonMadeUp
            onPress={handleSubmit(createAd)}
            title="Avançar"
            w={40} 
            variante="gray.100"
            colors="gray.700" 
            ml={2}/>
        </HStack>

        </VStack>
    </ScrollView>
)}

