import React from "react";
import { Image, IImageProps} from "native-base";

type Props = IImageProps & {
    size: number;
}

export function Photo({size, ...rest} : Props) {

    return(
        <Image 
        alt="photo"
        width={size}
        height={size}
        rounded="full"
        borderWidth={3}
        borderColor="blue.200"

        {...rest}
        />
    );
}