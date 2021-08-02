  
import Image from 'next/image'
import React, { useState } from 'react'

const Footer = ({ variant, logo, title, content, isLoggedIn }) => {


    
    const renderDefaultFooter =
       <footer><p>Technology partner @ Dewallstreet Corporation</p></footer>

    return (
        !variant && renderDefaultFooter
    )
}

export default Footer