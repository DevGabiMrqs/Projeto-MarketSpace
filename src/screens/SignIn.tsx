import React from "react";
import { VStack, Text, Center, Box} from "native-base";
import { Controller, useForm } from "react-hook-form";

import LogoSvg from "../assets/Logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function SignIn() {

    const { control, handleSubmit } = useForm();

    return (
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
                    />

            </Center>
        </VStack>
    );
}