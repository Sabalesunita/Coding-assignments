const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());


const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/librarySystem2")
}

const sectionSchema = new mongoose.Schema({
    section_name : {type : String, required : true}
});

const Section = mongoose.model("section", sectionSchema);

const bookSchema = new mongoose.Schema({
    name:{type:String, required:true},
    body:{type:String, required:true},
    section_name:{type : mongoose.Schema.Types.ObjectId, ref : "section", required : true}
})

const Book = mongoose.model("book", bookSchema);

const authorSchema = new mongoose.Schema({
    author_name:{type:String, required:true}
})

const Author = mongoose.model("author", authorSchema)

const bookAuthorSchema = new mongoose.Schema({
    book_id:{type : mongoose.Schema.Types.ObjectId, ref:"book", required:true},
    author_id:[{type : mongoose.Schema.Types.ObjectId, ref:"author", required:true}]
})

const BookAuthor = mongoose.model("bookAuthor", bookAuthorSchema)

///----------------CRUD API for Section-----------------------

app.post("/section", async (req, res)=>{
    const sec = await Section.create(req.body)

    return res.status(201).send({sec})
});

app.get("/section", async (req,res)=>{
    const sec = await Section.find().lean().exec();
    res.status(200).send({sec})
});

//----------------CRUD API for Books-----------------------

app.post("/book", async (req, res)=>{
    const book = await Book.create(req.body)

    return res.status(201).send({book})
});

app.get("/book", async (req,res)=>{
    const book = await Book.find().populate("section_name").lean().exec()
    res.status(200).send({book})
});


app.get("/book/:id", async(req, res)=>{
    const book = await Book.findById(req.params.id).lean().exec();
    res.status(200).send({book})
});

//----------------CRUD API for Authors-----------------------

app.post("/author", async (req, res)=>{
    const author = await Author.create(req.body)

    return res.status(201).send({author})
});

app.get("/author", async (req,res)=>{
    const author = await Author.find().lean().exec();
    res.status(200).send({author})
});

//----------------CRUD API for bookAuthor-----------------------

app.post("/bookauthor", async(req,res)=>{
    const bookauthor = await BookAuthor.create(req.body);
    return res.status(201).send({bookauthor})
})
app.get("/bookauthor", async (req,res)=>{
    const bookauthor = await BookAuthor.find().populate("author_id").populate("book_id").lean().exec();
    res.status(200).send({bookauthor})
});

// All books written by an Author

app.get("/booksbyauthor/:id", async(req, res)=>{
    const match = await BookAuthor.find({author_id:req.params.id}).lean().populate("book_id").exec();
    res.send(match)
})

app.listen(5000, async (req,res)=>{
    await connect();
    console.log("Listening to port 5000");
});