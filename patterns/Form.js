  
import Image from 'next/image'
import React, { useState } from 'react'
import { render } from 'react-dom'

const Form = ({ variant, label, title, content }) => {


    
    const renderDefaultForm =
      <form>
        <formheader>
          <h4>{title}</h4>
          <label>{label}</label>
          {content}
        </formheader>
        </form>
    
    

    return (
        (!variant && renderDefaultForm))
}

export default Form