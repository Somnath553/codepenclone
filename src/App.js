import './App.css';
import Editor from './Components/Editor';
import { useState ,useEffect} from 
'react';
import Uselocal from './Hooks/Uselocal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt ,faExpandAlt } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [html,setHtml] =Uselocal('html','');
  const [css,setCss] =Uselocal('css','');
  const [Js,setJs] =Uselocal('js','');
  const [srcDoc,setSrcDoc] =useState('');
  const [open,setopen]=useState(true)
  useEffect(()=>{
    const timeout = setTimeout(()=>{
        setSrcDoc(`
        <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${Js}</script>
        </html>
        `);
    },250)
    return ()=>clearTimeout(timeout)
  },[html,css,Js])

  return (
    <>
      <div className={`pane top-pane ${open?'':'closing'}`}>
        <Editor language="xml" 
        displayName="Html" 
        value={html} 
        onChange={setHtml} />
        <Editor
        language="css" 
        displayName="Css" 
        value={css} 
        onChange={setCss}/>
        <Editor
        language="javascript" 
        displayName="Js" 
        value={Js} 
        onChange={setJs}/>
      </div>
      <div className={`pane output ${open?'':'closing'}`}>
      <div className="editor-title output">
            Output
            <button type='button' className="btn" onClick={()=>{setopen(!open)}} >
                <FontAwesomeIcon
                icon={open?faCompressAlt:faExpandAlt}
                />
            </button>
        </div>
      <iframe 
      srcDoc={srcDoc}
      title="output" sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"  />
      </div>
    </>
  );
}

export default App;
