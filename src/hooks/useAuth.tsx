import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";


export function useAuth() {

    const context = useContext(AuthContext); // usando o contexto com hook useContext

    return context;
}