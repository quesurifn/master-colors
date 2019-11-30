import React, { Component } from 'react';
import Color from './Color';
import { Container, Draggable } from 'react-smooth-dnd';



class DraggableGrid extends Component {
  constructor() {
    super()

    this.state = {
        errors: false, 
        loading: true, 
        colors: false,
        locked: []
    };

    this.onDrop = this.onDrop.bind(this)
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
 

changeColor(idx, hex) {
    const { colors } = this.state
    const colorsCopy = colors
    colorsCopy[idx].Hex = hex
    this.setState({colors: colorsCopy}) 
}


dragInArray(array, added, removed) {
    const removedCopy = array[removed]
    array.splice(removed, 1);
    array.splice(added, 0, removedCopy);
    return array;
  }

  onDrop(e) {
    let stateCopy = this.state.array
    const swapped = this.dragInArray(stateCopy, e.addedIndex, e.removedIndex)
    this.setState({array: swapped})
  }

  render() {
    return (
      <div>
        <Container orientation="horizontal" onDrop={(e) => this.onDrop(e)}>
          {this.state.colors.map((item, idx) => {
            return (
              <Draggable key={idx}>[]
                  <Color color={item} lockOrUnlock={this.lockOrUnlock} idx={idx} changeColor={this.changeColor}/>
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default DraggableGrid;
