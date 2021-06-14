const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
 useNewUrlParser: true, useUnifiedTopology:true })

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))


app.get('/',  (req, res) => {
  const articles = [{
title: 'John Wick' ,
createdAt: new Date(),
description: 'Action Packed and thriller'
  },
  {
title: 'Creed',
createdAt: new Date(),
description: 'Action packed and Adventure'
  },
{
title: 'Dark Knight Rises',
createdAt: new Date(),
description : 'Action packed and Adventure'
},
{
title: 'Despicable Me',
createdAt: new Date(),
description : 'Adventure and Joyfull'
},
{
title: 'Top Gun Maverick',
createdAt: new Date(),
description : 'Adventure drama'
},
{
title: 'Mission Impossible',
createdAt: new Date(),
description: 'Action Thriller and Adventure'
  }]

    res.render('index', {articles: articles })
})




//article router

app.use('/articles', articleRouter)
  



app.listen(5000)