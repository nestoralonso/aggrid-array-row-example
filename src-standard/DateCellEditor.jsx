import React, { Component } from 'react';

var KEY_BACKSPACE = 8;
var KEY_DELETE = 46;
var KEY_F2 = 113;

const style = {
    backgroundColor: 'greenyellow',
};
// cell renderer for the proficiency column. this is a very basic cell editor,
export default class DateCellEditor extends Component {

    constructor(props) {
        super(props);
        // the entire ag-Grid properties are passed as one single object inside the params
        this.state = this.createInitialState(props);
        console.log('DateCellEditor=', props);
    }

    // work out how to present the data based on what the user hit. you don't need to do any of
    // this for your ag-Grid cellEditor to work, however it makes sense to do this so the user
    // experience is similar to Excel
    createInitialState(props) {
        const startValue = '';
        return {
            value: startValue,
        }
    }

    render() {
        return (
            <span>Fecha aqui</span>
        );
    }

    onChangeListener(event) {
        // if doing React, you will probably be using a library for managing immutable
        // objects better. to keep this example simple, we don't use one.
        var newState = {
            value: event.target.value,
        };
        this.setState(newState);
    }

    // called by ag-Grid, to get the final value
    getValue() {
        return this.state.value;
    }

    // cannot use componentDidMount because although the component might be ready from React's point of
    // view, it may not yet be in the browser (put in by ag-Grid) so focus will not work
    afterGuiAttached() {
        console.log('afterGui=');
    }

    // if we want the editor to appear in a popup, then return true.
    isPopup() {
        return false;
    }

    // return true here if you don't want to allow editing on the cell.
    isCancelBeforeStart() {
        return false;
    }

    // just to demonstrate, if you type in 'cancel' then the edit will not take effect
    isCancelAfterEnd() {
        return false;
    }
}
