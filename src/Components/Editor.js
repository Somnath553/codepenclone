import React ,{useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import {Controlled as ControlledEditor} from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt ,faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'
function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange,
    }=props
    const [open,setopen]=useState(true)
    const handleChange=(editor,data,value)=>{
            onChange(value)
    }
  return (
    <div className={`editor-container ${open?'' :'collapsed'}`}>
        <div className="editor-title">
            <Icon displayName={displayName}/>
            {displayName}
            <button type='button' className="btn" onClick={()=>{setopen(!open)}}>
                <FontAwesomeIcon
                icon={open?faCompressAlt:faExpandAlt}
                />
            </button>
        </div>
        <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-wrapper"
        options={{
            lineWrapping:true,
            lint:true,
            mode:language,
            lineNumbers:true,
            theme:'material'
        }}
        />
    </div>
  )
}

export default Editor
