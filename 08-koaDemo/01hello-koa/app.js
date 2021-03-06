const koa = require('koa');
const app = new koa();


app.use(async(ctx, next) => {
    console.log(`${ctx.request.method}${ctx.request.url}`);
    await next();

})

app.use(async(ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time:${ms}ms`)
})
app.use(async(ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = "<h1>hello koa2!!!</h1>"
})

const port = 3004;
app.listen(port, err => {
    console.log('app started at port ' + port);
})