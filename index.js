const express=require("express");
const app=express();
const port=3000;

const path=require("path");

app.use(express.static('public'));

const { v4:uuidv4}=require('uuid');
uuidv4();
const methodOverride=require("method-override")

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

app.set("view engine","ejs");

let data = [
    {
        id: uuidv4(),
        heading: "My Journey from Small Town to Software Engineer",
        content: "Growing up in a small town, I never imagined I would one day be working at a tech company in a big city. The road wasn't easy — countless nights of studying, facing failures, and sometimes even questioning my choices. But today, when I look back, I feel proud that I kept moving forward. This journey taught me resilience, patience, and the power of never giving up.",
        creator: "Adiba Suzein Hayat"
    },
    {
        id: uuidv4(),
        heading: "How Cooking Helped Me Find My Peace",
        content: "For years, I struggled with stress from work and personal life. One day, I started cooking just to pass the time. Slowly, it became my therapy. The aroma of fresh herbs, the sound of sizzling onions, and the joy of creating something delicious made me forget my worries. Cooking taught me mindfulness — to live in the moment and enjoy the process.",
        creator: "Daisy Cruz"
    },
    {
        id: uuidv4(),
        heading: "Solo Travel Changed My Perspective on Life",
        content: "When I first booked a solo trip, I was scared. Questions like 'What if something goes wrong?' haunted me. But once I set foot on my journey, I realized the beauty of being alone — making my own choices, meeting strangers who became friends, and discovering my own strength. Solo travel didn’t just change how I see the world, it changed how I see myself.",
        creator: "Sochin lina"
    }
];

// this sends request to show all the blogs 
app.get("/blogs",(req,res)=>{
    res.render("index.ejs",{data})
})

// this sends request to show the page where the blog will be created
app.get("/blogs/new",(req,res)=>{
  res.render("new.ejs");
})

// this sends request to add the new blog in the current blog's data
app.post("/blogs",(req,res)=>{
   let {heading,content,creator}=req.body;   
// unhi names ko let kr skte h jo already data m define h naye name nhi le skte 
   let id=uuidv4();
   data.push({id, heading, content, creator});
   res.redirect("/blogs");
})

// this sends request when user clicks on view then it will go to view page and show the full blog
app.get("/blogs/:id/view",(req,res)=>{
    let {id}=req.params;
    let b_find=data.find(b=>b.id===id);
    res.render("show.ejs",{b_find});
})

// this sends request when user clicks on edit then it will go to edit page 
app.get("/blogs/:id/edit",(req,res)=>{
    let {id}=req.params;
    let b_find=data.find(b=>b.id===id);
    res.render("edit.ejs",{b_find});
})



// this will sends request to the server when the user update the information
// aur patch request m sirf hum itna hi bhejte h /blogs/:id
app.patch("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    let b_find=data.find(b=>b.id===id);
    let {heading,content,creator}=req.body;
    b_find.heading=heading;
    b_find.content=content;
    b_find.creator=creator;
    res.redirect("/blogs");
})

app.delete("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    let b_find=data.find(b=>b.id===id);
    data=data.filter(b=>b.id!==id);
    res.redirect("/blogs");
})

app.listen(port,()=>{
    console.log(`listening to port:${port}`);
})