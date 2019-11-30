import React from 'react'
import {findFontColor} from '../utils/index'
import Modal from '../components/PaletteSaveModal'
import Loader from '../components/Loader'

export default class Generate extends React.Component {
    constructor() {
        super()

        this.state = {
            errors: false, 
            loading: true, 
            colors: false,
            locked: []
        };

        this.getMoreColors = this.getMoreColors.bind(this)
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this.lockOrUnlock = this.lockOrUnlock.bind(this)
        this.transformColors = this.transformColors.bind(this)
    }

    transformColors(colors)  {
        const { locked } = this.state
        const parsedColors = colors.map((e) => {
            return {
                ...e,
                fontColor: findFontColor(e.color)
            }
        })

        const mergeLockedWithNew = parsedColors.map((e, idx) => {
            const index = locked.map(e => e.idx).indexOf(idx);
            if(index > -1) {
                return locked[index];
            } else { 
                return e;
            }
        }) 

        return mergeLockedWithNew;
    }

    async getMoreColors() {
        try {
            this.setState({loading: true, colors: false})
            const response = await fetch("http://localhost:3001/colors/generate")
            const parsedResponse = await response.json()
            const final = this.transformColors(parsedResponse.data);
            this.setState({loading: false, colors: final})
        } catch(e) {
            this.setState({loading: false, error: e.message})
        }
    }

    async componentWillMount() {
        document.addEventListener("keydown", this._handleKeyDown);
        await this.getMoreColors();
    }

    async _handleKeyDown(event) {
        switch( event.keyCode ) {
            case 32:
                await this.getMoreColors()
                break;
            default: 
                break;
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown)
    }

    lockOrUnlock(color) {
        const locked = this.state.locked
        if( locked.some(e => e.color === color.color) ) {
            let filteredLocked = this.state.locked.filter(item => item.color !== color.color)
            this.setState({locked: filteredLocked});
        } else {
            this.setState(previousState => ({
                locked: [...previousState.locked, color]
            }));
        }
    }


    render() {
        const { errors, loading, colors, locked } = this.state
        return (
            <main>
                {loading && 
                    <Loader />
                }

                {errors &&
                    errors.map((e,idx) => {
                        return <div className="error" key={idx}>{e}</div>
                    })
                }

                {colors &&
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="100%" width="100%">
                        <desc>Generated Colors</desc>
                        {colors.map((e, idx) => {
                            const xPercentage = (idx / 5) * 100;
                            return  <svg key={idx} height="100%" width="20%" height="100%" x={`${xPercentage}%`}>
                                        <rect id={e.name} height="100%" fill={e.color} key={idx}>{e.name}</rect>
                                        <text alignmentBaseline="middle" textAnchor="middle" y="50%" x="50%" fontFamily="Verdana" fontSize="18" fill={e.fontColor}>{e.name}</text>
                                        <text alignmentBaseline="middle" textAnchor="middle" y="5%" x="50%" fontFamily="Verdana" fontSize="18" fill={e.fontColor} cursor="pointer" onClick={() => this.lockOrUnlock({...e, idx})}>{locked.some(i => i.color === e.color) ? "Locked" : "Unlocked"}</text>
                                    </svg>
                                })
                        }
                    </svg>
                }

                <div className="floating-1" style={{color: colors !== false ? colors[2].fontColor : "#000"}}>
                    You can use SPACE to generate a new combination
                </div>
                
                <Modal colors={colors.length !== undefined ? this.transformColors(colors) : []}/>
            </main>
          
        )
    }
}