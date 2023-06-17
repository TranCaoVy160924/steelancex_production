import { UserInfo } from "@/services/auth";
import { Dispatch, SetStateAction } from "react";

export default interface ContextValue {
   currentUser: UserInfo, 
   setCurrentUser: any
}