  
import Image from 'next/image'
import React, { useState } from 'react'
import { render } from 'react-dom'

const Card = ({ variant, logo, title, content, isLoggedIn,  }) => {



    const renderRefferals = <blockinput>
          <icon>
      <Image src='/assets/icons/icon-address.svg' alt='illustration' width='10px' height='10px' />
  </icon>
        <blockinputcontent>
          <label>address</label>
                  <p>x98abhv..87</p>
        </blockinputcontent>
          <icon>
      <Image src='/assets/icons/icon-address.svg' alt='illustration' width='10px' height='10px' />
  </icon>
      </blockinput>
    
    const renderDefaultCard =
        <p>card</p>
    
        const renderReferralsCard =
<card>
        <cardheader>
          <h4>My Referrals</h4>
          <count>09</count>  
                </cardheader>
                <cardcontent>
                    {renderRefferals}
                    {renderRefferals}
                                        {renderRefferals}
                    {renderRefferals}
                    {renderRefferals}
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