  
import Image from 'next/image'
import React, { useState } from 'react'
import { render } from 'react-dom'

const Form = ({ variant, logo, title, content, isLoggedIn }) => {


    
    const renderDefaultForm =
      <form>
        <formheader>
          <h4>Buy DogeX</h4>
          <label>1 DogeX = 0.09 BNB</label>
          <input placeholder='enter BNB amount' />
          <button>Buy now</button>
        </formheader>
        </form>
    
    

    return (
        (!variant && renderDefaultForm))
}

export default Form