require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const currentTime = require(__dirname + '/getDateString')
const PORT = process.env.PORT || 3000

const homeContent = "Hello and welcome! I'm Yiyu Qian, and this is my little corner on the internet where I share my thoughts, experiences, and insights. Whether you're here for inspiration, information, or just a bit of a read, I'm glad you stopped by."

const aboutContent = "This blog is a tapestry of the things I love and the lessons I've learned. You'll find a range of topics here - from personal development to travel adventures, from technological innovations to the simple joys of everyday life. My goal is to create content that not only informs but also inspires and engages."

const contactContent = "Don't miss out on any updates! Subscribe to my newsletter and follow me on social media for the latest posts, tips, and behind-the-scenes glimpses."
	
const composeContent = 	"Write your blog post here, click publish when you ready to publish."

const day = currentTime()

//set up app
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// set up mongoose
// create MongoDB database
mongoose
    .connect("mongodb+srv://Krismile:Qyy2614102@todolistcluster.dalyaca.mongodb.net/blogDB", { useNewUrlParser: true })
    .then((res) => {
        console.log("链接成功");
    })
    .catch((err) => {
        console.log("链接失败");
    });

//create a SCHEMA that sets out the fields each document will have and their datatypes
const blogsSchema = new mongoose.Schema({
	blogTitle: {
		type: String,
		required: [true, 'No name specified!'],
	},
	blogBody: {
		type: String,
		required: [true, 'No body specified!'],
	},
	blogCreated: {
		type: String,
		required: [true, 'Time not specified!'],
	},
})

// create model from schema as a collection
const Blog = mongoose.model('Blog', blogsSchema)

// Add this route handler before your other routes
app.get('/favicon.ico', (req, res) => {
	// Respond with a 204 No Content status code
	res.status(204).end();
  });

//get requests
app.get('/', (req, res) => {
    Blog.find({}) // Fetch all blogs from the database
        .then(blogs => {
            // Render home page with blogs
            res.render('home', {
                startingContent: homeContent,
                blogs: blogs,
                mainTitle: 'Home',
            });
        })
        .catch(err => {
            // Handle any errors during database fetch
            console.error(err);
            res.status(500).send('Error occurred while fetching data');
        });
});


app.get('/about', (req, res) => {
	res.render('about', { content: aboutContent, mainTitle: 'About' })
})

app.get('/contact', (req, res) => {
	res.render('contact', { content: contactContent, mainTitle: 'Contact' })
})

app.get('/compose', (req, res) => {
	res.render('compose', { content: composeContent, mainTitle: 'Compose' })
})

app.get('/:singleBlog', (req, res) => {
	let path = req.params.singleBlog
	// find blog that matches search param
	Blog.findOne({ _id: path })
		.then(foundBlog => {
			if (!foundBlog) {
				console.log('No blog found. Blog=' + foundBlog)
			} else {
				//show existing blog
				res.render('partials/singlePost', {
					blogTitle: foundBlog.blogTitle,
					blogBody: foundBlog.blogBody,
					blogCreated: foundBlog.blogCreated,
				})
			}
		})
		.catch(err => {
			console.log(err)
		})
})

app.get('/delete/:singleBlog', (req, res) => {
	let path = req.params.singleBlog
	// find blog that matches search param, and then delete
	Blog.findByIdAndDelete({ _id: path })
		.then(foundBlog => {
			if (!foundBlog) {
				console.log('No blog found. Blog=' + foundBlog)
			} else {
				res.redirect("/");
			}
		})
		.catch(err => {
			console.log(err)
		})
})

// post request
app.post('/compose', (req, res) => {
	if (res.statusCode === 200) {
		const newBlogTitle = req.body.blogTitle
		const newBlogBody = req.body.blogText
		const newBlogTime = currentTime()

		let newPost = new Blog({
			blogTitle: newBlogTitle,
			blogBody: newBlogBody,
			blogCreated: newBlogTime,
		})

		newPost.save()

		res.redirect('/')
	} else {
		console.log('something is wrong!')
	}
})

// Server Listening:
app.listen(PORT, function() {
	console.log("Server running on port 3000.");
});
  

