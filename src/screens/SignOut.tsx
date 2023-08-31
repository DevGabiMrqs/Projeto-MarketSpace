import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export function SignOut() {

    const { signOut } = useContext(AuthContext)

    useFocusEffect(
        useCallback(() => {
            signOut();
        }, [])
    );


    return(
        <>

        </>
    )
}