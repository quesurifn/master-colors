import React from 'react';
import { Modal } from 'semantic-ui-react'
import { SketchPicker } from 'react-color';

const ColorPickerModal = (props) => {
    return (
        <Modal trigger={<i class="fas fa-swatchbook"></i>}>
            <SketchPicker onChange={(color, event) => props.onChange(props.idx, color)} color={props.color} />
        </Modal>
    )
}

export default ColorPickerModal;