import { UserMetadata } from "@supabase/supabase-js";
import { createContext } from "react";

export const AuthContext = createContext<{user: UserMetadata|null, setUser: (user:UserMetadata|null)=>void}>(
    {user: null, setUser: ()=>{}}
);