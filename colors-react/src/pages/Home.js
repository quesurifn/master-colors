import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

import Loader from '../components/Loader'
import ColorCard from '../components/ColorCard'

export default class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            colors: false,
            error: false,
            loading: true,
        }
    }


    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:3001/colors/")
            const decodedResponse = await response.json();
            this.setState({colors: decodedResponse, loading: false})
        } catch(e) {
            this.setState({loading: false, error: e.message})
        }
      
    }

    render() {
        const {loading, error, colors} = this.state
        return (
            <Grid columns={5}>
                {loading && 
                    <Loader />
                }

                {error && 
                    <p>{error}</p>
                }
                    {colors && colors.data.map((e, idx) => {
                        return <Grid.Column key={idx}>
                                    <ColorCard colors={e} idx={idx} />
                            </Grid.Column> 
                    })}
            </Grid>
        )
    }

}