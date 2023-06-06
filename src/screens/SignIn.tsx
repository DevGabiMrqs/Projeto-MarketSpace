import React from "react";
import { VStack, Text, Center, Box} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import LogoSvg from "../assets/Logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";


type FormDataProps = {
    email: string;
    password: string;
}

const schema = yup.object({
    password: yup.string().min(6).max(30).required("Informe a senha!"),
    email: yup.string().required("Informe o seu e-mail!").email("E-mail inválido"),
}).required

export function SignIn() {

    const { control, handleSubmit, formState:{ errors }} = useForm<FormDataProps>({
        defaultValues: {
            //email
            //senha
        }
    });

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
                    type="password"
                    onChangeText={onChange}
                    value={value}
                    />
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
            />
        </Center>
    </>
    );
}