import React from 'react';
import logo from './cbnits.jpg'
const Success =()=>{ 
          return(
            <div>
              <h1>Successfully loaded</h1>
              <img className="cbnits" 
              src={logo} alt="logo"></img>
            </div>
          )
        }
export default Success;