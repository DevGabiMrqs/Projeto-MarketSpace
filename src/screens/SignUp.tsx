import React, { useState } from "react";
import { Box, VStack, Center, Text, ScrollView, Icon, Pressable, View, useToast, Alert} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImagePickerSuccessResult } from "expo-image-picker";
import { FileInfo } from "expo-file-system";

import { MaterialIcons } from "@expo/vector-icons"
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import LogoSvg from "../assets/Logo.svg"
import {Photo} from "../components/Photo"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";

type FormDataProps = {
    avatar: string;
    name: string;
    email: string;
    tel: string;
    password: string;
    confirmPassword: string;
}

const signUpSchema = yup.object ({
    name: yup.string().required("Informe o seu nome."),
    email: yup.string().required("Informe o seu email."),
    tel: yup.string().required("Informa o seu telefone."),
    password: yup.string().required("Informe a sua senha.").min(6,"Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: yup.string().required("Confirme a sua senha.").min(6,"Senha deve ter pelo menos 6 caracteres"),
})


export function SignUp(){
    
    const[showFirst, setShowFirst] = useState(false);
    const[showSecond, setShowSecond] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    const[avatar, setAvatar] = useState<ImagePickerSuccessResult>({} as ImagePickerSuccessResult);
    const[photoIsLoading, setPhotoIsLoading] = useState(false)
    const[userPhoto, setUserPhoto] = useState("https://avatars.githubusercontent.com/u/114935103?s=400&u=72ff65639ede1e9b3284095b0aef27c83d5bc145&v=4");

    
    const { signIn } = useAuth();
    const { user } = useAuth();
    const {control, handleSubmit, formState : { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });
    
    const toast = useToast();
    const navigation = useNavigation();

    function goBackToSignIn() {
        navigation.goBack();
    }

    async function handleUserPhotoSelect(){
        try {
            setPhotoIsLoading(true)

            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // instalei a lib do ImagePicker do Expo.
                quality: 1,
                aspect: [4, 4],
                allowsEditing:true
            })

            if(photoSelected.canceled){ 
                return;
            }

            if(photoSelected.assets[0].uri) {
                setUserPhoto(photoSelected.assets[0].uri)
                const photoInfo:FileInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                
                if(photoInfo.exists && !photoInfo.isDirectory) { //aqui estou passando a negativa, que se caso não houver essas condições a foto será escolhida.
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

    async function handleSignUp({ name, email, tel, password}: FormDataProps){    
        try {
            
            setIsLoading(true)
            avatar && avatar.assets && avatar.assets.length > 0
            const fileExtension = avatar.assets[0].uri.split('.').pop();

            const photoFile = {
                name: `${name}.${fileExtension}`.toLocaleLowerCase(),
                uri: avatar.assets[0].uri,
                type: `${avatar.assets[0].type}/${fileExtension}`
            } as any;
        

        setAvatar(photoFile)

        
        const formData = new FormData(); //enviando as info do user através do formulário
        
        formData.append('avatar', photoFile)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('tel', tel)
        formData.append('password', password)

        // const headers = {
        //     'Content-Type': 'multipart/form-data'
        // }
        
        const response = await api.post("/users", formData);
        await signIn(email, password);
        console.log(response.data)
        
        
    } catch (error) {
        
        console.log(error)
        setIsLoading(true);
        
        const isAppError = error instanceof AppError;
        const title = isAppError ? error.message : "Não foi possível enviar, tente novamente."
        
        toast.show({
            title,
            placement: "top",
            bgColor:"red.600"
        })
        
        
    }
    

    }

    return (

        <VStack flex={1} bgColor="gray.600" >
            <Center pb={10}>
                <Box pt={10}>
                    <LogoSvg width={60}/>
                </Box>
                <Text fontFamily="heading" fontSize="lg" pb={1}>
                    Boas vindas!
                </Text>
                <Text textAlign="center" pb={8} fontFamily="body" color="gray.200">
                    Crie sua conta e use o espaço para comprar {'\n'}
                    itens variados e vender seus produtos.
                </Text>
                <View pb={14} position="relative">
                        <Photo size={79} source={{uri: userPhoto}} />
                        <TouchableOpacity 
                        onPress={handleUserPhotoSelect}>
                            <View>
                                <Icon 
                                as={MaterialIcons} 
                                name="edit" 
                                fontSize="small"
                                color="gray.700"
                                size={28}
                                position="absolute"
                                bottom={1}
                                right={-14}
                                bgColor="blue.200"
                                rounded="lg"
                                />
                            </View>
                        </TouchableOpacity>
                </View>

                <Center pb={14}>

                <Controller
                control={control}
                name="name"
                render={({field: { onChange, value }}) => (
                    <Input 
                    placeholder="Nome"
                    autoCapitalize="words"
                    type="text"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                    />
                    )}
                    />

                <Controller
                control={control}
                name="email"
                render={({field: { onChange, value }}) => (
                    <Input 
                    placeholder="E-mail"
                    type="text"
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                    />
                    )}
                />

                <Controller
                control={control}
                name="tel"
                render={({field: { onChange, value }}) => (
                    <Input 
                    placeholder="Telefone"
                    type="text"
                    keyboardType={"numeric"}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.tel?.message}
                    />
                    )}
                    />


                <Controller
                control={control}
                name="password"
                render={({field: { onChange, value }}) => (
                    <Input
                    placeholder="Senha"
                    type={showFirst ? "text" : "password"} 
                    InputRightElement={<Pressable onPress={() => setShowFirst(!showFirst)}>
                    <Icon as={<MaterialIcons name={showFirst ? "visibility" : "visibility-off"} />} size={5} mr="2" color="gray.300" />
                    </Pressable>}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                    />
                    )}
                />

                <Controller
                control={control}
                name="confirmPassword"
                render={({field: { onChange, value }}) => (
                    <Input
                    placeholder="Confimar senha"
                    type={showSecond ? "text" : "password"} 
                    InputRightElement={<Pressable onPress={() => setShowSecond(!showSecond)}>
                    <Icon as={<MaterialIcons name={showSecond ? "visibility" : "visibility-off"} />} size={5} mr="2" color="gray.300" />
                    </Pressable>}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.confirmPassword?.message}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    />
                    )}
                    />
            
                </Center>

                <Button 
                title="Criar"
                variante="gray.100"
                colors="gray.600"
                onPress={handleSubmit(handleSignUp)} //quando der o submit vai enviar a req com o post na function handleSignUp para criar o novo usuário
                />

            </Center>
            
            <Center pb={10}>
                <Text pb={3}>
                    Já tem uma conta?
                </Text>

                <Button
                title="Ir para o Login"
                variante="gray.500"
                colors="gray.200"
                onPress={goBackToSignIn}
                />

            </Center>
        </VStack>
    )

}


// const fileExtension = userPhoto.split(".").pop(); //aqui eu defino o tipo de arquivo que será informado, utizando o pop, é possível identificar o tipo se for jpg ou png por ex.
//     console.log(fileExtension);

// const photoFile = {
//     name: `${user?.name}.${fileExtension}`.toLowerCase(),
//     uri: userPhoto,
//     type: "image"
// } as any; // a foto terá o nome do usuário como default e tipo(png) e a foto em si.
//  console.log(photoFile)