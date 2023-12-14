import React, { useEffect, useState } from 'react'
import style from "./AddNewBookForm.module.css"
import ImagePreview from '../ImagePreview/ImagePreview'
import { BsSend, BsSendDash } from 'react-icons/bs'
import {  toast } from 'react-toastify'
import { service } from '../../appwrite/bookKeepServices'
import { authService } from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AddNewBookForm() {

    const [isDragging,setIsDragging]=useState(false)
    const [file,setFile]=useState(null)
    const navigate=useNavigate()
    const [fileName,setFileName]=useState("")
    const [authorName,setAuthorName]=useState("")
    const [category,setCategory]=useState("")
    const userID=useSelector(state=>state.auth.userID)


    const deleteFile=()=>setFile(null)

    useEffect(()=>{
        if(fileName=="" && file){
            setFileName(file.name)
        }
    },[file])

    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(fileName==""){
            toast.error(
                "Filename must be given"
            )
            return
        }
        else{
            console.log({
                file:file  ,
                name: fileName
            })
            let fileId=""
            if(file){
                const fileData=await service.uploadPDF(file)
                fileId=fileData.$id
            }
            console.log(userID)
            const res=await service.addNewBook(
                {
                    fileId: fileId,
                    name: fileName,
                    userId:userID,
                    category: category!=""?category:null,
                    author: authorName
                }
            )
            console.log(res)
            if(res.$id){
                toast.success("Book Uploaded")
                setTimeout(()=>{
                    navigate(-1)
                },1000)
            }
        }
    }

  return (
    <div className={style.formContainer}>
        <form className={style.form} 
            onSubmit={(e)=>handleSubmit(e)}

            encType='multipart/form-data'
        >
            <div>
                {/* upload file */}
                <h3 className={style.header} >Upload Book</h3>
                <div className={style.dropfileContainer}
                    onDragOver={(e)=>{
                        e.preventDefault()
                        setIsDragging(true)
                    }}
                    onDragLeave={()=>{
                        setIsDragging(false)
                    }}
                    onDrop={(e)=>{
                        e.preventDefault()
                        setIsDragging(false)
                        setFile(e.dataTransfer.files[0])
                    }}
                >
                    <div className={style.centerBox}>
                        {
                            (isDragging==false && file==null)?
                            (
                                <>
                                <span
                                style={{color:"#047cb7"}}
                                >Drag and Drop Here</span>
                                <span>or</span>
                                <span>
                                    <label className={style.browseFileLabel} >
                                    Browse File
                                    <input type="file" placeholder='Browse File'  className={style.browseFileInput}
                                        accept="application/pdf"
                                        onChange={(e)=>{
                                            e.preventDefault()
                                            setFile(e.target.files[0])

                                        }}
                                    />
                                    </label>
                                </span>
                                 </>
                            ):(
                                <>
                                    {
                                        file==null && 
                                        <span>Drop here</span>

                                    }
                                </>
                            )
                        }
                        
                    </div>
                    {
                        file&&
                        <span>File Available</span>
                    }


                </div>
            </div>
            <div className={style.nameInputContainer}>
                <input type="text"
                    placeholder='Author Name'
                    value={authorName}
                    onChange={(e)=>setAuthorName(e.target.value)}
                    className={style.nameInput}
                />
            </div>
            <div className={style.nameInputContainer}>
                <input type="text"
                    placeholder='Category'
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    className={style.nameInput}
                />
            </div>
            <div className={style.nameInputContainer}>
                <input type="text"
                    placeholder='Write Name Here ...'
                    value={fileName}
                    onChange={(e)=>setFileName(e.target.value)}
                    className={style.nameInput}
                />
                <button
                    className={style.submitBtnContainer}
                    type='submit'
                >
                    <BsSendDash/>
                </button>
            </div>
        </form>
    </div>
  )
}
export default AddNewBookForm