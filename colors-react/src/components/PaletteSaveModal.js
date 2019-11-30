import React from 'react';
import SVGPalette from '../components/SVGPalatte'
import { Button, Modal, Input, Form } from 'semantic-ui-react'


class PaletteSaveModal extends React.Component {
    constructor() {
        super()
        this.state = {
            inspiration: false
        }
    }

    async onSave() {
        const { colors } = this
        const mergeLockedWithNew = this.transformColors(colors)

        const response = await fetch(this.API_URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(mergeLockedWithNew) // body data type must match "Content-Type" header
          });
          const parsedResponse = await response.json(); // parses JSON response into native JavaScript objects
        
          if(parsedResponse.errors) {
                this.setState({errors: parsedResponse.errors})
          } else {
                this.props.history.push('/profile/');
          }
    }

    render() {
        const { colors } = this.props
    

        return <Modal trigger={<Button className="floating-2">Save Palette</Button>}>
        <Modal.Header>Save your palette</Modal.Header>
            <Modal.Content image>
                <div className="w-100p absolute-center">
                    <div className="w-300">
                        <Form>
                            <SVGPalette colors={ colors.map(e => e.color) } />
                            <p>What Was Your Inspiration?</p>
                            <Input className="w-100p" type="text" placeholder="I wanted to create the perfect thanksgiving..."></Input>
                            <Button className="w-100p p-20">Save</Button>
                        </Form>

                    </div>
                </div>
            
            </Modal.Content>
      </Modal>
        
    }
}

export default PaletteSaveModal;