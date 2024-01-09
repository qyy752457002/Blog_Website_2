require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const currentTime = require(__dirname + '/getDateString')
const PORT = process.env.PORT || 3000

const homeContent =
	"Chuck Norris is so fast, he can run around the world and punch himself in the back of the head If you spell Chuck Norris in Scrabble, you win. Forever If you ask Chuck Norris what time it is, he always says, 'Two seconds 'til.' After you ask, 'Two seconds 'til what?' he roundhouse kicks you in the face If you ask Chuck Norris what time it is, he always says, 'Two seconds 'til.' After you ask, 'Two seconds 'til what?' he roundhouse kicks you in the face, Chuck Norris can lead a horse to water AND make it drink Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth. Chuck Norris counted to infinity - twice, Chuck Norris has two speeds. Walk, and Kill, Chuck Norris was refused a part in the movie SAW because the traps would have taken him 1 second to escape and roundhouse kick Jiggysaw in the face. When Chuck Norris sends in his taxes, he sends blank forms and includes only a picture of himself, crouched and ready to attack. Chuck Norris has not had to pay taxes, ever Outer space exists because it's afraid to be on the same planet with Chuck Norris The Great Wall of China was originally created to keep Chuck Norris out. It failed miserably. Chuck Norris is currently suing NBC, claiming Law and Order are trademarked names for his left and right legs. When Superman takes a day off, he calls Chuck Norris to fill in for him."

const aboutContent =
	'Pudding bear claw halvah pastry cake gummi bears. Cheesecake candy canes sesame snaps halvah chocolate I love chupa chups. Jelly-o toffee soufflé marzipan pie pastry brownie. Carrot cake donut icing croissant brownie I love. Jelly icing chocolate bar pudding topping sesame snaps. Pastry biscuit powder wafer lollipop powder. Soufflé cake jelly beans candy cake. Pudding pie bonbon candy canes topping bear claw jelly-o I love. Chocolate bar chupa chups dragée donut macaroon. Powder marshmallow dessert jujubes fruitcake. Jujubes icing candy canes gingerbread lollipop cake pastry. Shortbread pudding chocolate cake I love I love shortbread.'

const contactContent =
	'Cake ice cream brownie powder lollipop sweet roll. Biscuit tootsie roll candy canes icing chupa chups. Liquorice jelly-o liquorice chocolate gummies. I love candy canes caramels lollipop apple pie. Candy I love carrot cake tart cupcake. Sugar plum jelly beans sugar plum jelly beans caramels. Bear claw powder danish jelly muffin shortbread lemon drops biscuit shortbread. Carrot cake donut chupa chups I love dessert oat cake gummi bears. Carrot cake pie croissant fruitcake cupcake pudding lollipop caramels. Candy canes powder bonbon jelly-o chocolate bar gingerbread pie. Cheesecake carrot cake pastry cheesecake chocolate cake lemon drops oat cake. Bear claw candy toffee pudding chocolate I love. Pastry I love danish sweet roll liquorice donut jelly-o toffee.'

const composeContent =
	'Write your blog post here, click publish when you ready to publish.'
const day = currentTime()

//set up app
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// set up mongoose
// create MongoDB database
mongoose
    .connect("mongodb://localhost:27017/capstone_blogDB", { useNewUrlParser: true })
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

//create model from schema
const Blog = mongoose.model('Blog', blogsSchema)

//default posts
const firstPost = new Blog({
	blogTitle: 'Cupcakes',
	blogBody:
		'Cupcake ipsum dolor sit amet candy canes apple pie oat cake gummies. I love dessert muffin oat cake pudding I love. Cotton candy wafer cookie candy canes lemon drops pie marshmallow gingerbread. Sesame snaps chupa chups bonbon I love danish bear claw. Bonbon powder jelly beans jelly gummi bears jelly beans. Chocolate cake jujubes I love dragée jelly shortbread liquorice. Gummies I love jelly-o fruitcake lollipop. Sesame snaps muffin chocolate bar chocolate bar sugar plum soufflé. Tart tootsie roll topping pie lollipop powder topping icing. I love soufflé brownie chocolate jelly-o dessert apple pie cookie. Halvah cake chocolate jelly sweet sugar plum bonbon donut. Croissant candy sweet roll gingerbread tart cake. Marshmallow jelly chupa chups donut I love. Pastry cotton candy tiramisu muffin I love bonbon sweet tiramisu.',
	blogCreated: day,
})
const secondPost = new Blog({
	blogTitle: 'Muffins',
	blogBody:
		'I love apple pie dragée powder cupcake donut lollipop. Croissant gummi bears chocolate bar I love I love cheesecake lollipop tart. I love tootsie roll toffee marzipan lemon drops cake muffin. I love lollipop powder croissant tiramisu. Sweet roll cheesecake jelly beans sweet gummi bears ice cream marzipan. Biscuit jelly beans I love I love tart gummies macaroon chocolate cake. Toffee candy canes toffee I love cupcake gingerbread carrot cake gummi bears halvah. Dragée oat cake biscuit fruitcake gummi bears pudding marshmallow I love. Powder wafer marshmallow dragée liquorice powder pudding bonbon lollipop. Carrot cake candy I love cookie candy. Candy canes I love sesame snaps muffin candy canes apple pie I love chocolate bar. Dessert marzipan bonbon carrot cake chocolate cake apple pie danish jelly beans. Cookie I love cake sweet roll toffee I love caramels carrot cake croissant. Pastry gummies cake cookie chupa chups. Carrot cake tootsie roll cheesecake jelly wafer halvah bonbon icing pudding. Lollipop gingerbread fruitcake ice cream icing powder. Pie oat cake caramels marzipan halvah gummi bears apple pie lollipop gingerbread. Donut I love powder chocolate bar I love chocolate sweet roll. Muffin sesame snaps I love chupa chups cake bonbon. Gingerbread soufflé donut I love lemon drops I love lemon drops. I love gummi bears muffin lollipop gingerbread icing carrot cake. I love I love lollipop fruitcake cotton candy macaroon bonbon donut. Gingerbread gummi bears tart sugar plum cookie jelly-o. I love halvah pudding I love biscuit jelly beans jujubes sweet roll. Chocolate bar sweet bear claw I love caramels bonbon icing. Danish I love brownie wafer donut oat cake topping chocolate lemon drops.',
	blogCreated: day,
})

const blogsArr = [firstPost, secondPost]

// Add this route handler before your other routes
app.get('/favicon.ico', (req, res) => {
	// Respond with a 204 No Content status code
	res.status(204).end();
  });

//get requests
app.get('/', (req, res) => {
	if (res.statusCode === 200) {
		//get all tasks from DB collection and put it on home page
		Blog.find({})
			.then(blogs => {
				if (blogs.length === 0) {
					// Function call
					Blog.insertMany(blogsArr)
						.then(function () {
							console.log('Data inserted') // Success
							res.redirect('/')
						})
						.catch(function (error) {
							console.log(error) // Failure
						})
				} else {
					res.render('home', {
						startingContent: homeContent,
						blogs: blogs,
						mainTitle: 'Home',
					})
				}
			})
			.catch(function (err) {
				console.log(err)
			})
	} else {
		console.log('Not getting DB blogs')
	}
})

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
  

