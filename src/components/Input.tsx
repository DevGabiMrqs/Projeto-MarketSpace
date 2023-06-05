import React from "react";
import { Input as NativeBaseInput, IInputProps, FormControl, VStack } from "native-base";



type Props = IInputProps & {
    errorMessage?: string | null
}

export function Input({errorMessage=null, isInvalid, ...rest} : Props){ //Se o input não for inválido e não conter erros, pego o resto.

    const invalid = !!errorMessage || isInvalid

    return(
        <FormControl isInvalid={invalid}>
            <NativeBaseInput 
            width={279}
            height={45}
            fontFamily="body"
            fontSize="md"
            bgColor="gray.700"
            borderRadius={6}
            borderWidth="0"
            placeholderTextColor="gray.400"
            mb={14}
            isInvalid={invalid}
            _invalid={{
                borderWidth: 1,
                borderColor:'Red',
            }}
            _focus={{
                borderWidth: 1,
                borderColor: 'gray.100',
            }}
            {...rest}
            />

            <FormControl.ErrorMessage>
            {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}




