import React, { useState } from "react";
import { Box, VStack, Center, Text, ScrollView, Icon, Pressable, View } from "native-base";
import { Controller, useForm } from "react-hook-form";

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
import { TouchableOpacity } from "react-native";

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
    
    const {control, handleSubmit, formState : { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const { signIn } = useAuth();
    const navigation = useNavigation();

    function goBackToSignIn() {
        navigation.goBack();
    }


    async function handleSignUp({avatar, name, email, tel, password}: FormDataProps){

        try {
            setIsLoading(false)

            await api.post("/users", { name, email, tel, password,
                
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: {
                    name: "teste",
                    email: "teste@email.com",
                    tel: "4899845487",
                    password: "123456"
                }
            });

        } catch (error) {

            throw error;

            setIsLoading(true);
        }

    }


    return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Photo size={79} />
                    <TouchableOpacity >
                    <View>
                    <Icon 
                    as={MaterialIcons} 
                    name="edit" 
                    color="blue.200"
                    size={22}
                    position="absolute"
                    bottom={1}
                    right={-14}
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
    </ScrollView>
    )
}