import { Center, Spinner } from "native-base";
import React from "react";


export function IsLoading() {

    return(
        <Center>
            <Spinner color="blue.200" size="lg" />
        </Center>
    );
}