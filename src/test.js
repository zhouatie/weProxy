const Koa = require('koa')

const app = new Koa()

app.use((context) => {
  console.log(context)
  context.body = 'haha'
})

app.listen(9000)