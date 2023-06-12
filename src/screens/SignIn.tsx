import React, { useState } from "react";
import { VStack, Text, Center, Box, Pressable, Icon} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "../assets/Logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProp } from "../routes/auth.routes";
import { useAuth } from "@hooks/useAuth"


type FormDataProps = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o seu e-mail!").email("E-mail inválido"),
    password: yup.string().required("Informe a senha!").min(6, "A senha deve ter pelo menos 6 caracteres."),
})


export function SignIn() {

    const { control, handleSubmit, formState:{ errors }} = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    });

    const[show, setShow] = useState(false);



    //const { signIn } = useAuth();// criar o context e traze-lo para logar
    const navigation = useNavigation<AuthNavigatorRoutesProp>();

    function goToSignUp() {
        //navigation.navigate(signIn)
        //fazer a rota de autenticação, se o user não estiver autenticado ir pro signUp
    }



    function handleSignIn({email, password} : FormDataProps) {

        try {
            //await signIn(email, password)
        } catch (error) {
            
        }
    }

    return (
        <>
        <VStack px={50} bgColor="gray.600">
            <Center py={77}>
                <Box>
                <LogoSvg/>
                </Box>
                <Text 
                color="gray.100"
                fontFamily="heading"
                fontSize={36}
                fontWeight="extrabold"
                letterSpacing={-1.5}>
                    marketspace 
                </Text>
                <Text color="gray.300" fontFamily="body" pb={100}>
                    Seu espaço de compra e venda 
                </Text>

                <Text color="gray.100" fontFamily="body" pb={5} >
                    Acesse sua conta
                </Text>

                <Center>

                <Controller
                control={control}
                name="email"
                render={({field: { onChange, value }}) => (
                    <Input 
                    placeholder="E-mail"
                    type="text"
                    onChangeText={onChange}
                    value={value}
                    />
                    )}
                    />
                
                <Controller
                control={control}
                name="password"
                render={({field: { onChange, value }}) => (
                    <Input
                    placeholder="Senha"
                    onChangeText={onChange}
                    value={value}
                    type={show ? "text" : "password"} 
                    InputRightElement={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="gray.300" />
                    </Pressable>}/>
                    )}
                    />

                    <Button 
                    title="Entrar"
                    variante="blue.200"
                    colors="gray.700"
                    />
                </Center>
            </Center>
        </VStack>
        <Center pt={50}>
            <Text pb={5}>Ainda não tem acesso?</Text>
            <Button 
            title="Criar uma conta"
            variante="gray.500"
            colors="gray.200"
            onPress={goToSignUp}
            />
        </Center>
    </>
    );
}


