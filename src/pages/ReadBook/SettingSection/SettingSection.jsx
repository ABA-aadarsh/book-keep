import React, { useEffect, useState } from 'react'
import style from "./SettingSection.module.css"
import { useForm } from 'react-hook-form'
import { service } from '../../../appwrite/bookKeepServices'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function SettingSection({bookData,setBookData,styling={}}) {
    const [updateLoading,setUpdateLoading]=useState(false)
    const [infoUpdatedStatus,setInfoUpdatedStatus]=useState(false)
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm(
        {
            defaultValues:{
                name:(bookData?.name)?bookData.name:"",
                author:(bookData?.author)?bookData.author:"",
                category:(bookData?.category)?bookData.category:"",
            }
        }
    )
    const handleSubmitFunction=async (data)=>{
        const formValues={
            name: data.name,
            author: data.author,
            category: data.category
        }
        setUpdateLoading(true)
        const res=await service.updateBook({
            id: bookData.$id,
            added: JSON.parse(bookData.added),
            completionStatus: bookData.completionStatus,
            ...formValues
        })
        if(res){
            toast.success("Changes Saved Successfully")
        }else{
            toast.error("Failed to save changes")
        }
        setBookData(prev=>{return {...prev,...formValues}})
        setUpdateLoading(false)
        setInfoUpdatedStatus(false)
    }
    const deleteRecord=async ()=>{
        // deleting file first
        const fileRes=await service.deletePDF(bookData.fileId)
        if(fileRes){
            // file deleted successfully
            const res=await service.removeBook(bookData.$id)
            if(res){
                toast.success("File Deleted Successfully")
                toast.info("Heading back to home page...")
                setTimeout(()=>{
                    toast.dismiss()
                    navigate("/")
                },500)
            }else{
                toast.error("Error occured while deleting record")
            }
        }else{
            toast.error("Error occured while deleting PDF")
        }
    }
    const clearNotes=async ()=>{
        const res=await service.updateBook({
            id: bookData.$id,
            added: {notes:"",summary:"",review:""},
            completionStatus: bookData.completionStatus,
            author: bookData.author,
            category: bookData.category,
            name: bookData.name
        })
        if(res){
            toast.success("Notes Cleared Successfully")
            setBookData(prev=>{return {...prev,added:JSON.stringify({notes:"",summary:"",review:""})}})
        }else{
            toast.error("Failed to clear notes")
        }
    }
    const resetCompletionStatus=async ()=>{
        const res=await service.updateBook({
            id: bookData.$id,
            added: JSON.parse(bookData.added),
            completionStatus: "not Started",
            author: bookData.author,
            category: bookData.category,
            name: bookData.name
        })
        if(res){
            toast.success("Status Reset Successful")
            setBookData(prev=>{return {...prev,completionStatus: "not Started"}})
        }else{
            toast.error("Failed to reset status")
        }
    }
  return (
    <div className={style.container}
        style={styling}
    >
        <form 
            onSubmit={handleSubmit(handleSubmitFunction)}
            className={style.bookInfoForm}
        >
            <h3
                className={style.title}
            >Book Info</h3>
            <hr 
                className={style.spacingLine}
            />
            <div
                className={style.inputBox}
            >
                <span
                    className={style.inputFieldName}
                >Name</span>
                <input type="text" {...register("name")} 
                    className={style.input}
                    onChange={()=>setInfoUpdatedStatus(true)}
                />
            </div>
            <div
                className={style.inputBox}
            >
                <span
                    className={style.inputFieldName}
                >Author</span>
                <input type="text" {...register("author")} 
                    className={style.input}
                    onChange={()=>setInfoUpdatedStatus(true)}
                />
            </div>
            <div
                className={style.inputBox}
            >
                <span
                    className={style.inputFieldName}
                >Category</span>
                <input type="text" {...register("category")} 
                    className={style.input}
                    onChange={()=>setInfoUpdatedStatus(true)}
                />
            </div>

            <button type="submit"
                disabled={!infoUpdatedStatus}
                className={style.updateBtn}
                title={infoUpdatedStatus==false ? "Make changes to update":""}
            >
                {
                    updateLoading?
                    <>Loading...</>
                    :<>Update</>
                }
            </button>
        </form>
        <div
            className={style.dangerZone}
        >
            {/* danger zone */}
            <h2
                className={style.dangerZoneMainTitle}
            >Danger Zone</h2>
            <hr 
                className={style.spacingLine}
            />
            <p
                className={style.warning}
            >Warning: Actions here are not reversible and you will be held responsible completely.</p>
            <div
                className={style.actionBox}
            >
                <h3
                    className={style.title}
                >Delete Record</h3>
                <span>Click on the button "Confirm Delete" to delete this record</span>
                <button
                    className={style.btn}
                    onClick={deleteRecord}
                >Confirm Delete</button>
            </div>
            <div
                className={style.actionBox}
            >
                <h3
                    className={style.title}
                >Clear Notes, Summary and Review</h3>
                <span>Click on the button "Confirm Clear" to delete all added notes, summary and review</span>
                <button
                    className={style.btn}
                    onClick={clearNotes}
                >Confirm Clear</button>
            </div>
            <div
                className={style.actionBox}
            >
                <h3
                    className={style.title}
                >Reset Completion Status</h3>
                <span>Click on the button "Confirm Reset" to reset your completion status</span>
                <button
                    className={style.btn}
                    onClick={resetCompletionStatus}
                >Confirm Reset</button>
            </div>
        </div>
    </div>
  )
}

export default SettingSection