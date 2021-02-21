import React from 'react';
const Navigation =({onRouteChange,isSignedIn})=>{
    
        if(isSignedIn){
            return(
        <nav style={{display:"flex",justifyContent:"center"}}>
            <p 
            onClick={()=>onRouteChange('signout')}
            className='f3 link dim black underline pa3 pointer'>sign out</p>
        </nav>)
        } else {
            return(
            <nav style={{display:"flex",justifyContent:"center"}}>
            <p 
            onClick={()=>onRouteChange('sign')}
            className='f3 link dim black underline pa3 pointer'>sign In</p>
            <p 
            onClick={()=>onRouteChange('register')}
            className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
            )
        }
    
}
export default Navigation;