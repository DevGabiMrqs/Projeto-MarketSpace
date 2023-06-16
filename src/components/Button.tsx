import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text} from "native-base";

type Props = IButtonProps & {
    title: string;
    variante: "blue.200" | "gray.100" | "gray.500"
    colors: "gray.700" | "gray.600" | "gray.200"
}


export function Button({title, variante, colors, ...rest}:Props) {

    return(
        <NativeBaseButton
        w={279}
        h={42}
        backgroundColor={variante === "blue.200" ? "blue.200" :
                        variante === "gray.100" ? "gray.100" :
                        variante === "gray.500" ? "gray.500" : "gray.500"}
                        {...rest}
        >
            <Text
            fontFamily="heading"
            fontSize={14}
            color={ colors === "gray.700" ? "gray.700":
            colors === "gray.600" ? "gray.600" :
            colors === "gray.200" ? "gray.200": "gray.200"}
            >
                {title}
            </Text>

        </NativeBaseButton>
    )
}

//passei por Props o título etão quando eu passar lá no componente o título é renderizado a partir daqui.