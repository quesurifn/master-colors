import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import SVGPalatte from './SVGPalatte'

const ColorCard = (props) => {
    return <Card>
    <SVGPalatte colors={props.colors} idx={props.idx} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span>Kyle Fahey</span>
      </Card.Meta>
      <Card.Description>
        
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
}

export default ColorCard;