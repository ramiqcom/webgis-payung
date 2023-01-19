import { useState } from "react";

// Dropdown class
function Select(props) {
    const [items, setItems] = useState(props.items);

    return (

        <select className='select' id={props.id} style={props.style} onChange={props.onChange} defaultValue={props.selected}>
        
        <option value="" disabled >{props.placeholder}</option>
        {
            items.map((object, i) => <option value={object} key={i}> {object} </option>)
        }
        </select>

    );
}

// Checkbox class
function Checkbox(props) {
    return (
      <label>
        <input type="checkbox" checked={props.checked} onChange={props.onChange} disabled={props.disabled} id={props.id} />
        {props.label}
      </label>
    )
}

module.exports = { Select, Checkbox }