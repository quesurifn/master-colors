import React from 'react';
import ColorPickerModal from './ColorPickerModal'

class Color extends React.Component {

    constructor() {
        super()

        this.state = {
            currentShade: null,
            changedColor: false, 
            locked: false,
        }

        
    }

    render() {
        const { locked, changedColor } = this.state
        const { color } = this.props;


        return (
            <div className="indv-color" style={{backgroundColor: changedColor || color.Hex}}>
       
                 <div className="shades hide" onClick={this.openShades}>
                    <i class="fas fa-th"></i>
                     {/* Map through Shades */
                        color.shades.map((e, idx) => {
                            <div>
                                
                            </div>
                        })
                     }


                 </div>

                 <div className="pick">
                     <ColorPickerModal color={color.Hex} idx={this.props.idx} onChange={this.props.changeColor} />
                 </div>


                 <div className="lock" onClick={this.lockOrUnlock}>
                     {locked &&
                         <i class="fas fa-lock-open"></i>
                     }

                     {!locked &&
                        <i class="fas fa-lock"></i>
                     }
                 </div>


            </div>
        )
    }
    
}

export default Color;