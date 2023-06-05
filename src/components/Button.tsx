import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text} from "native-base";

type Props = IButtonProps & {
    title: string;
}


export function Button({title}:Props) {

    return(
        <NativeBaseButton
        w={279}
        h={42}
        >
        <Text
        fontFamily="heading"
        fontSize={12}
        >
            {title}
        </Text>

        </NativeBaseButton>
    )
}

//passei por Props o título etão quando eu passar lá no componente o título é renderizado a partir daqui.