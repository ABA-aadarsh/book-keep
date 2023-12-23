import { Client, Databases, ID, Query, Storage } from "appwrite";
import { envConf } from "../envConf/envConf";
import { toast } from "react-toastify";

class Service{
    client=new Client();
    databases;
    bucket;
    constructor (){
        this.client
        .setEndpoint(envConf.endpoint)
        .setProject(envConf.projectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async addNewBook({fileId,name,userId,category,author}){
        try {
            return await this.databases.createDocument(
                envConf.dbId,
                envConf.collectionId,
                ID.unique(),
                {
                    fileId,
                    name,
                    userId,
                    added:JSON.stringify(
                        {
                            notes:"",
                            summary:"",
                            review:""
                        }
                    ),
                    category:category || "",
                    author:author || "",
                    completionStatus:"not Started"
                }
            )
        } catch (error) {
            console.log(error) 
            toast.error(error.response.message)
        }
    }
    async removeBook(id){
        try{
            await this.databases.deleteDocument(
                envConf.dbId,
                envConf.collectionId,
                id
            )
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
    async getBook(id){
        try{
            return await this.databases.getDocument(
                envConf.dbId,
                envConf.collectionId,
                id
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async listBooks(userId){
        console.log("here")
        try{
            const res= await this.databases.listDocuments(
                envConf.dbId,
                envConf.collectionId,
                [
                    Query.equal("userId",[userId])
                ]
            )
                console.log(res)
                return res
        }catch(error){
            console.log(error)
            return false
        }
    }
    async updateBook(
        {
            id,
            name,
            added={},
            author,
            completionStatus,
            category
        }
    ){
        try{
            return await this.databases.updateDocument(
                envConf.dbId,
                envConf.collectionId,
                id,
                {
                    name,
                    added:JSON.stringify(added),
                    author,
                    completionStatus,
                    category
                }
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    
    getPreviewImage(fileId){
        try{
            return this.bucket.getFilePreview(
                envConf.bucketId,
                fileId
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async uploadPDF(file){
        try{
            return await this.bucket.createFile(
                envConf.bucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async deletePDF(fileId){
        try {
            await this.bucket.deleteFile(
                envConf.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }
    getPDFview(fileId){
        // console.log(fileId)
        try{
            return  this.bucket.getFileView(
                envConf.bucketId,
                fileId
            )
        } catch(error){
            console.log(error)
            return false

        }
    }
}
export const service=new Service()