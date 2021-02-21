import React ,{Component} from 'react';
import Navigation from './Components/Navigation/navigation';
import app from './App.css';
import Register from './Components/Registration/registration'
import Signin from './Components/Signin/signin'
import  Success from './Components/Success/sucess'


class  App extends Component {
  constructor(){
    super();
    this.state={
      route:'sign',
      isSignedIn:false,
      user:{
           id:'',
            name:'',
            email:'',
            entries:0,
            joined:''
      }
    }
  }

loadUser=(res)=>{
  this.setState({res:{
    id:res.id,
     name:res.name,
     email:res.email,
     entries:res.entries,
     joined:res.joined
  }})
}

onInputChange=(event)=>{
  console.log(event.target.value);
}

onRouteChange=(route)=>{
  if(route === 'signout') {
    this.setState({isSignedIn:false})
  } else if(route === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}
  onButtonSubmit = () =>{
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b",
    'https://www.pexels.com/photo/adult-attractive-beautiful-beauty-415829/')
    .then(
      function(response){
        console.log(response)

      },
      function(err){

      }
    );
  }
 render(){
  return (
    <div className="App">
    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
{ this.state.route === 'home'
 ? <div>
<Success/>
 </div>
 :
 
 (this.state.route === 'sign' 
 ? 
 <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
 : 
 <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
 )
 
}    
    </div>
  );
 }
}

export default App;
