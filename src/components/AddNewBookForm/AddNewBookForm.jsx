import React, { useEffect, useState } from 'react'
import style from "./AddNewBookForm.module.css"
import ImagePreview from '../ImagePreview/ImagePreview'
import { BsSend, BsSendDash } from 'react-icons/bs'
import {  toast } from 'react-toastify'

function AddNewBookForm() {

    const [isDragging,setIsDragging]=useState(false)
    const [file,setFile]=useState(null)
    const [fileName,setFileName]=useState("")

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
            toast.success("Book Uploading...")
            console.log({
                file:file  ,
                name: fileName
            })
            const form=new FormData()
            form.append("fileName",fileName)
            form.append("file",file)

            await fetch("http://localhost:8080/book",{
                method:"POST",
                body:form
            }).then(res=>{
                return res.json()
            }).then(res=>console.log(res))
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
                        <ImagePreview
                        file={file}
                        deleteFile={deleteFile}
                        />
                    }


                </div>
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