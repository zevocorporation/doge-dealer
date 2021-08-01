  

import React,{useState} from 'react'
const Prompt = ({ variant, title,content, isOpen, setIsOpen }) => {

    const closePromptHandler = (e) => {
    e.preventDefault()
    setIsOpen(false)
    }
    
    const renderDefaultPrompt =
   <backdrop>
         <prompt>
            <promptheader>
                <h3>{title}</h3>
               <icon onClick={(e)=> closePromptHandler(e)}>close</icon>
            </promptheader>
            <promptcontent>
               {content}
            </promptcontent>
          </prompt>
    </backdrop>

    return (
        !variant && isOpen && renderDefaultPrompt
    )
}

export default Prompt