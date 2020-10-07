/**
 *  Deploying
 *  1. npm run-script build
 *  2. npm install -g serve
 *  3. Set-ExecutionPolicy Unrestricted OR run as administrator in shell
 *  4. serve -s build
 * 
 *  Go to https://app.netlify.com/
 *  1. Sign up
 *  2. Drag build folder, done!
 * 
 * 
 */

import React, {
  useState, 
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function GitHubUser({login}){
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     fetch(`https://api.github.com/users/${login}`)
//     .then(res => res.json())
//     .then(setData)
//     .catch(console.error);
//   }, []);

//   if (data) {
//     return(
//       <div>
//         <div>data
//           <br></br>
//         {JSON.stringify(data)}
//         </div>
//         <div>specifics
//           <br></br>
//           <h1>{data.login}</h1>
//           <img src={data.avatar_url} height={80} width={80}></img>
//         </div>
//       </div>
//     )
//   }
//   return null;
// }

function Checkbox(){
  const [checked, setChecked] = useState(false);

  useEffect(() => {

  });

  function toggle(){
    if(checked){
      setChecked(false);
    }
    else{
      setChecked(true);
    }
  }
  return(
    <div>
      <input 
          type="checkbox"
          value={checked}
          onChange={toggle}></input>
      {checked ? "checked" : "not checked"}
    </div>
  )
}

function App(){
  return(
    //<GitHubUser login="theman"></GitHubUser>
    <Checkbox></Checkbox>
  )
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
