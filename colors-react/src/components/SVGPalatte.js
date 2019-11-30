import React from 'react'
const SVGPalette = (props) => {
    const { colors } = props
    const parsedColors = Object.values(colors).filter(e => typeof e === 'string' && e.indexOf("#") > -1)
    
    return <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%">
                {parsedColors.map((e, idx) => {
                    const xPercentage = (idx / 5) * 100;
                    return <rect x={`${xPercentage}%`} width="60" height="100%" fill={e} key={idx} />
                    
                })}
            </svg>

   
}

export default SVGPalette;