import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export function useAuth() {

    const context = useContext(AuthContext); // usando o contexto com hook useContext

    return context;
}