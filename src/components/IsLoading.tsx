import React from "react";
import { Center, Spinner } from "native-base";


export function IsLoading() {

    return(
        <Center>
            <Spinner color="blue.200" size="lg" />
        </Center>
    );
}