const express =require("express");

const app =express();

app.use(logger);

app.get("/books",logger,(req,res)=>{
    return res.send("Fetching all books");
})

app.get("/book",logger,(req,res)=>{
    return res.send({route:"/book", role: req.role})
});

function logger(req,res,next)
{
        if(req.path=="/book")
        {
            req.role="Game of thrones";
        }
        else if(req.path=="/book")
        {
            req.role="Harry potter";
        }
        else
        {
            req.role="Book not found";
        }
        next();    
}

app.listen(5000,function(){
    console.log("Listening to port 5000");
});
