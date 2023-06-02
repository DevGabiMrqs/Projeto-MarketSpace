import React from "react";
import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";


type Props = IInputProps & {
    errorMessage?: string | null
}

export function Input ({errorMessage=null, isInvalid, ...rest} : Props){ //Se o input não for inválido e não conter erros, pego o resto.

    const invalid = !!errorMessage || isInvalid

    // return(
    //     <FormControl isInvalid={invalid}/>
    //         <NativeBaseInput 
    //         width={279}
    //         height={45}
    //         bgColor="gray.700"
    //         borderRadius={6}
    //         isInvalid={invalid}
    //         _invalid={{
    //             borderWidth: {1},
    //             borderColor:"Red",
    //         }}
    //         _focus={{
    //             border: {1},
    //             borderColot: "gray.100",
    //         }}
    //         {...rest}
    //         />
            
    //         <FormControl.ErrorMessage>
    //         {errorMessage}
    //         </FormControl.ErrorMessage>
    //     </FormControl>
    // )
}




