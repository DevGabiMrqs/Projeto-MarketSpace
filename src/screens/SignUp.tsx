import React, { useState } from "react";
import { Box, VStack, Center, Text, ScrollView, Icon, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons"
import { Controller, useForm } from "react-hook-form";

import LogoSvg from "../assets/Logo.svg"
import {Photo} from "../components/Photo"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

type FormDataProps = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const navigation = useNavigation();

export function SignUp(){

    const[showFirst, setShowFirst] = useState(false);
    const[showSecond, setShowSecond] = useState(false);

    const {control, handleSubmit, formState : { errors } } = useForm<FormDataProps>();

    function handleSignUp<FormDataProps>(){

        try {
    
        } catch (error) {
    
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
                <Box pb={14}>
                    <Photo/>
                </Box>

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
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                    />
                )}
                />

                <Controller
                control={control}
                name="phone"
                render={({field: { onChange, value }}) => (
                    <Input 
                    placeholder="Telefone"
                    type="text"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.phone?.message}
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
                <Text pb={5}>
                    Já tem uma conta?
                </Text>

                <Button
                title="Ir para o Login"
                variante="gray.500"
                colors="gray.200"
                />

            </Center>
        </VStack>
    </ScrollView>
    )
}