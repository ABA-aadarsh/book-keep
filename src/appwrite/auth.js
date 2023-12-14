import { Account, Client, ID } from "appwrite";
import { envConf } from "../envConf/envConf";

class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(envConf.endpoint)
        .setProject(envConf.projectId);
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name=""}){
        try{
            const res=await this.account.create(ID.unique(),email,password,name)
            if(res!=null){
                return await this.login({email,password})
            }else{
                return null
            }
        }catch(error){
            console.log("Error: ",error)
            return null
        }
    }
    async login({email,password}){
        try{
            const res=await this.account.createEmailSession(email,password)
            return res
        }catch(error){
            console.log(error)
            return null
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout(){
        try{
            await this.account.deleteSessions()
            return true
        }catch(error){
            throw error
            return null
        }
    }
}

export const authService=new AuthService()