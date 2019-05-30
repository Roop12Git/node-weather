
const path = require('path')//core modules on top
const express =require('express')
const hbs = require('hbs')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port =process.env.PORT || 3000//set by heroku or default fallback port 3000

//customise server ,define paths for EXPRESS CONFIG-
const mypath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)//tell express to use views directory
hbs.registerPartials(partialsPath)
//create a partial


//setup static directory to serve
app.use(express.static(mypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'VaayuVaruna- The weatherApp',
        name:'VaayuVaruna'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
       title:'About us',
       name:'VaayuVaruna'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        email:'help@vaayuvaruna.ie'
    })
})
app.get('/weather',(req,res)=>{
    // if there is no address send back an error message
   if(!req.query.address){
       return res.send({
        error:' please include an address to search'
    })
    }
    //callback chaining
    geocode(req.query.address,(error, {latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
        
            res.send({
            forecast:forecastData,
            location,
            address:req.query.address

            })

        })
    })
})

   
    
//query string example
// app.get('/products',(req,res)=>{
    //ensure there is an search term in the query
//     if(!req.query.search){
//          return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('notFound',{
        title: '404',
        errorMessage:'Sorry Article not found'
    })

})

//using a wildcard * character to 
//match anything that is not specified so far in above routes 
//for the app.get function
app.get('*',(req,res)=>{
    res.render('notFound',{
        title:'404',
        errorMessage:'Sorry, page not found'
    })
})


//start the server
app.listen(port,()=>{
console.log('server is up on port ' + port)
})