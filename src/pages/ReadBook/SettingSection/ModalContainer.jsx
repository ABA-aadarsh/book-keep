import React, { useState } from 'react'
import style from "./ModalContainer.module.css"
import { FaTimes } from "react-icons/fa";
function ModalContainer(
    {
        title="Demo Title",
        message="This is a demo Message",
        action=()=>{},
        buttonMessage="Confirm Action",
        show=false,
        setModalData=()=>{}
    }
) {
    const [loading,setLoading]=useState(false)
  return (
    <div
        className={style.container}
        style={
            {
                display:show?"flex":"none"
            }
        }
    >
        <div
            className={style.center}
        >
            <div
                className={style.titleContainer}
            >
                <h2
                    className={style.title}
                >{title}</h2>
                <FaTimes
                    className={style.closeBtn}
                    onClick={()=>{
                        setModalData((prev)=>{
                            return {...prev, show:false}
                        })
                    }}
                />
            </div>
            <p
                className={style.warningMessage}
            >
                Warning: This action is not reversible. You are completely responsible for your actions.
            </p>
            <p
                className={style.message}
            >{message}</p>
            <button
                onClick={async()=>{
                    setLoading(true)
                    await action()
                    setLoading(false)
                    setModalData(prev=>{
                        return {...prev,show:false}
                    })
                }}
                className={style.actionBtn}
            >
                {
                    loading ?
                    <>Loading ...</>
                    :
                    <>{buttonMessage}</>
                }
            </button>
            </div>
    </div>
  )
}

export default ModalContainer