import React, { useState } from "react";
import { VStack, Text, Center, Box, Pressable, Icon, useToast} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "../assets/Logo.svg";
import { Input } from "../components/Input";
import { ButtonMadeUp } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProp, AuthRoutes } from "../routes/auth.routes";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";
import { ScrollView } from "react-navigation";

type FormDataProps = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o seu e-mail!").email("E-mail inválido"),
    password: yup.string().required("Informe a senha!").min(6, "A senha deve ter pelo menos 6 caracteres."),
})

export function SignIn() {
    
    const[show, setShow] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    
    const toast = useToast();
    
    const { control, handleSubmit, formState:{ errors }} = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    });

    const { signIn } = useAuth();// trazendo o hook do contexto para cá
    const navigation = useNavigation<AuthNavigatorRoutesProp>();

    function goToSignUp() {
        navigation.navigate("signUp")
    }
    //fazer a rota de autenticação, se o user não estiver autenticado ir pro signUp



    async function handleSignIn({email, password} : FormDataProps) {


        try {
        
            setIsLoading(true)
            await signIn(email, password)

        } catch (error) {
            
            const isAppError = error instanceof AppError ;
            setIsLoading(false)
            const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente."
            
            toast.show ({
                title,
                placement:"top"
            })
        }
    }

    return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
                    keyboardType={"email-address"}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
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
                    </Pressable>}
                    errorMessage={errors.password?.message}
                    />
                )}
                />

                    <ButtonMadeUp
                    title="Entrar"
                    variante="blue.200"
                    colors="gray.700"
                    onPress={handleSubmit(handleSignIn)}
                    />
                </Center>
            </Center>
        </VStack>
        <Center pt={50}>
            <Text pb={5}>Ainda não tem acesso?</Text>
            <ButtonMadeUp
            title="Criar uma conta"
            variante="gray.500"
            colors="gray.200"
            onPress={goToSignUp}
            />
        </Center>
    </ScrollView>
    );
}


