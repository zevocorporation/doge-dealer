  
import Image from 'next/image'
import React, { useState } from 'react'

const Block = ({ variant, logo, title, content, isLoggedIn }) => {


    
    const renderDefaultBlock =
<block>
    <icon>
      <Image src='/assets/icons/icon-referrer.svg' alt='illustration' width='24px' height='24px' />
    </icon>
    <blockcontent>
          <label>
            Referrer address
          </label>
      <p>0x4c7...497A1De2a69</p>
    </blockcontent>
  </block>    
    
    return (
        (!variant && renderDefaultBlock)
    )
}

export default Block