import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter } from 'react-router-dom'
import { withRouter } from "react-router"

class Nav extends React.Component {
    constructor() {
        super()

        this.state = {
            activeItem:''
        }
    }
  
    handleItemClick = (e, { name }) => { 
        switch (name) {
            case "Sign In Or Register":
                this.props.history.push("/create")
                break;
            case "home":
                this.props.history.push("/")
                break;
            case "generate":
                this.props.history.push("/generate")
                break;
            default:
              break;
        }
        this.setState({ activeItem: name })
    }
  
    render() {
      const { activeItem } = this.state;
      return (
          <header>
                <Menu inverted>
                <Menu.Item
                    name='home'
                    active={activeItem === 'Home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='generate'
                    active={activeItem === 'Generate'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Sign In Or Register'
                    active={activeItem === 'Sign In / Register'}
                    onClick={this.handleItemClick}
                />
                </Menu>
        </header>
        
      )
    }
  }

  export default withRouter(Nav)