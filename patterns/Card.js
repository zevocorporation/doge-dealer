  
import Image from 'next/image'
import React, { useState } from 'react'
import { render } from 'react-dom'

const Card = ({ variant, logo, title, content, isLoggedIn  }) => {



  
    const renderDefaultCard =
        <p>card</p>
    
        const renderReferralsCard =
<card>
        <cardheader>
          <h4>My Referrals</h4>
          <count>09</count>  
                </cardheader>
                <cardcontent>
                    {content}
                    {content}
                                        {content}
                    {content}
                    {content}
                </cardcontent>
        </card>
    


    

        const renderLeaderboardCard =
<card>
        <cardheader>
          <h4>Leaderboard</h4>
          <tag>Weekly</tag>  
        </cardheader>
      </card>
    return (
        (!variant && renderDefaultCard) ||
        (variant === 'referrals-card' && renderReferralsCard) ||
        (variant === 'leaderboard-card' && renderLeaderboardCard) 
    )
}

export default Card