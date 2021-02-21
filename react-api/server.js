const express=require('express');
const bodyParser=require('body-parser')
const bcrypt= require('bcrypt-nodejs')
const cors= require('cors')
const knex=require('knex');


const db=knex({
      client: 'pg',
      connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'postgres',
      database : 'mydb'
    }
  });

//   db.select('*').from('users').then(data=>{
//       console.log(data);
//   });

const app=express();
app.use(bodyParser.json());
app.use(cors());

// app.get('/',(req,res)=>{
//     res.send(db.users)
// })

//creating endpoint for user login
app.post('/signin',(req,res)=>{
    db.select('email','hash').from('login')
    .where('email', '=' , req.body.email)
    .then(data=>{
    const result=bcrypt.compareSync(req.body.password,data[0].hash);
       //console.log(result);
    if(result) {
       return  db.select('*').from('users').where('email', '=',req.body.email)
        .then(user=>{
            console.log(user)
            res.json(user[0])
        })
        .catch(err=>res.status(400).json('no such user'))
    } else {
        res.status(400).json("wrong credentials")
    }
})
.catch(err=>res.status(400).json('wrong credentials'))
    
})


//creating endpoints for user registration
app.post('/register',(req,res)=>{
    const { email, name ,password} = req.body;
    const hash=bcrypt.hashSync(password);
    db.transaction(trans=>{
        trans.insert({
            hash:hash,
            email:email
        }).into('login')
        .returning('email')
         .then(login=>{  
            return trans('users')
            .returning('*')
            .insert({
            email:login[0],
            name:name,
            joined:new Date() 
        }).then(user=>{
            res.json(user[0]);

        })
    }).then(trans.commit)
    .catch(trans.rollback);
    
    }).catch(err=>res.status(400).json(err))
    
})



app.get('/success/:id',(req,res)=>{
    const {id} =req.params;
    db.select('*').from('users').where({id})
    .then(user=>{
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('not found');
        }
    }).catch(err=>res.status(400).json(err))   
})


app.listen(3000,()=>{
    console.log('app is running on port 3000')
});

