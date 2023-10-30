import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypingAnimation = () => {
  return  (<TypeAnimation
        sequence={[
            // Same substring at the start will only be typed once, initially
            'Chat with OWN AI',
            1000,
            'Built with OPEN AI 🤖',
            2000,
            'Your own Customized ChatGPT 💻',
            1700,
        ]}
        speed={50}
        style={{ fontSize: '60px', color:'black' ,display:"inline-block",textShadow:"1px 1px 40px #111",fontStyle:"italic"}}
        repeat={Infinity}
        />)
}

export default TypingAnimation