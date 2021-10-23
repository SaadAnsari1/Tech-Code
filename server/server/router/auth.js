const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/Authenticate")
// const UserSuperUserauthenticate = require("../middleware/Authenticate")
// const CoAdminauthenticate = require("../middleware/Authenticate")
const Adminauthenticate = require("../middleware/AdminAuthenticate")
require('../db/conn')
const User = require('../model/userSchema')
const News = require('../model/News')
// const SuperUser = require('../model/AdminSchema')
// const CoAdmin = require('../model/AdminSchema')
const Admin = require('../model/AdminSchema')
const multer = require('multer')

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads/');
   },
   filename: function (req, file, cb) {
      // cb(null, new Date().toISOString() + file.originalname);
      cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname)
   }
});

const fileFilter = (req, file, cb) => {
   // reject a file
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

const upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5
   },
   fileFilter: fileFilter
});





//ROUTE 1: Add a new User register using: POST Api SuperUserauthenticate , CoAdminauthenticate , Adminauthenticate 
router.post('/register', authenticate, async (req, res) => {

   const { name, email, phone, password, cpassword } = req.body;//getting data by object destructuring

   if (!name || !email || !phone || !password || !cpassword) { //user should fill all feild
      return res.status(422).json({ error: "plz fill all feild" })
   }

   try {
      const userExist = await User.findOne({ email: email })//this connects email from userschema.js to this email from auth.js

      if (userExist) {
         return res.status(422).json({ error: "email already exists" })
      } else if (password != cpassword) {
         return res.status(422).json({ error: "password didnt match" })
      } else {
         const user = new User({ name, email, phone, password, cpassword })// adding data to database || if both key and value and are same no need to write twice 
         //hashing done before save
         await user.save() //saving data in user constant 
         res.status(201).json({ message: "user registetred sucessfully" })
      }
   } catch (error) {
      console.log(error);

   }
})

//ROUTE 2: signin using: POST Api Userauthenticate Signin
router.post("/signin", async (req, res) => {
   try {
      const { email, password } = req.body;//getting email password by object destructring 

      if (!email || !password) {
         return res.status(400).json({ error: "plz fill the data" })
      }
      const userLogin = await User.findOne({ email: email });
      //  console.log(userLogin);

      if (userLogin) {

         const isMatch = await bcrypt.compare(password, userLogin.password)//comparing hashed password with login passwords

         const token = await userLogin.generateAuthToken();//calling function from userschema

         console.log(`the token is :- ${token}`);

         res.cookie("jwtoken", token, { //takes name:string and value:string(this value comes from userschema )
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true  //for secure connection 
         })

         if (!isMatch) {
            res.status(400).json({ message: "Invalid Credentials " })//dono me invalid credential he dena hai taaki hacker ko pata na chale
         }
         else {
            res.json({ message: "user signin sucessfully" })
         }

      } else {
         res.status(400).json({ error: "Invalid Credentials" })//dono me invalid credential he dena hai
      }

   } catch (error) {
      console.log(error);

   }
})


//ROUTE 4: Add a new Super User register using: POST Api CoAdminauthenticate,Adminauthenticate ,  

//ROUTE 5: Super User signin : POST Api SuperUser Only SuperUserauthenticate

//ROUTE 6: Add a new CO-Admin register using: POST Api Adminauthenticate ,  
router.post('/Adregister', async (req, res) => {

   const { name, email, phone, password, cpassword, role } = req.body;//getting data by object destructuring

   if (!name || !email || !phone || !password || !cpassword || !role) { //Admin should fill all feild
      return res.status(422).json({ error: "plz fill all feild" })
   }

   try {
      const adminExist = await Admin.findOne({ email: email })//this connects email from Adminschema.js to this email from auth.js

      if (adminExist) {
         return res.status(422).json({ error: "email already exists" })
      } else if (password != cpassword) {
         return res.status(422).json({ error: "password didnt match" })
      } else {
         const Admin = new Admin({ name, email, phone, password, cpassword, role })// adding data to database || if both key and value and are same no need to write twice 
         //hashing done before save
         await Admin.save() //saving data in Admin constant 
         res.status(201).json({ message: "Admin registetred sucessfully" })
      }
   } catch (error) {
      console.log(error);

   }
})

//ROUTE 7: CO-Admin signin : POST Api CO-Adminauthenticate
router.post("/Adsignin", async (req, res) => {
   try {
      const { email, password } = req.body;//getting email password by object destructring 

      if (!email || !password) {
         return res.status(400).json({ error: "plz fill the data" })
      }
      const AdminLogin = await Admin.findOne({ email: email });
      //  console.log(AdminLogin);

      if (AdminLogin) {

         const isMatch = await bcrypt.compare(password, AdminLogin.password)//comparing hashed password with login passwords

         const token = await AdminLogin.generateAuthToken();//calling function from Adminschema

         console.log(`the token is :- ${token}`);

         res.cookie("admintoken", token, { //takes name:string and value:string(this value comes from Adminschema )
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true  //for secure connection 
         })

         if (!isMatch) {
            res.status(400).json({ message: "Invalid Credentials not match " })//dono me invalid credential he dena hai taaki hacker ko pata na chale
         } else {
            res.json({ message: "admin signin sucessfully" })
         }

      } else {
         res.status(400).json({ error: "Invalid Credentials" })//dono me invalid credential he dena hai
      }

   } catch (error) {
      console.log(error);

   }
})

//ROUTE 8: Admin signin : POST Api Adminauthenticate 

//ROUTE 5: Add a new News using: POST Api ,
router.post('/news', upload.single('image'), async (req, res) => {
   console.log(req.file);
   const { title, subtitle, author, category } = req.body;//getting data by object destructuring
   // const { image } = req.file.path;//getting data by object destructuring

   // if (!title || !subtitle) { //user should fill all feild 
   //    return res.status(422).json({ error: "plz fill all feild" })
   // }

   try {
      const Post = new News({
         title,
         subtitle,
         image: "http://localhost:5000/" + req.file.path,
         author,
         category
         // categorycategory
      })// adding data to database || if both key and value and are same no need to write twice 
      //hashing done before save
      await Post.save() //saving data in user constant 
      res.status(201).json({ message: "Post sucessfully" })

   } catch (error) {
      console.log(error);
   }
})

//ROUTE 6: Get  News using: GET Api
router.get("/news", async (rep, res) => {
   try {
      const getData = await News.find();
      res.status(200).send(getData);
   } catch (e) {
      res.status(401).send(e, "Error is Get");
   }
});

// ROUTE 7: Update a News using: PATCH Api
router.patch("/News/:id", upload.single('image'), async (req, res) => {
   console.log(req.file);
   // const { title, subtitle } = req.body;
   // const { image } = req.file.path; image,
   // const {req.body , req.file.path} = up
   try {
      const _id = req.params.id;
      const Update = await News.findByIdAndUpdate(_id, req.body, { new: true });
      res.send(Update);
   } catch (e) {
      res.status(500).send(e);
   }
});;

//ROUTE 8: Delete a News using: DELETE Apireq.body,
router.delete("/news/:id", Adminauthenticate, async (req, res) => {
   try {
      const _id = req.params.id;
      const Delete = await News.findByIdAndDelete(_id);
      res.send(Delete);
   } catch (e) {
      res.status(500).send(e);
   }
});

//ROUTE 9: GET 1 a News using: GET Api
router.get("/news/:id", async (req, res) => {
   try {
      const _id = req.params.id;
      const data = await News.findById(_id);
      if (!data) {
         return res.status(404).send();
      } else {
         res.send(data);
      }
   } catch (e) {
      res.status(500).send(e);
   }
});

//ROUTE 10: GET category News using: GET Api
router.get("/news/category/:category", async (req, res) => {

   try {
      const category = req.params.category;
      console.log(category)
      const ctgry = await News.find({ category })
      console.log(ctgry)
      if (!ctgry) {
         return res.status(404).send();
      } else {
         res.send(ctgry);
      }

   } catch (err) {
      return res.status(500).json({ msg: err.message })
   }

   //    // if (!data) {
   //    //    return res.status(404).send();
   //    // } else {
   //    //    res.send(data);
   // }

})

//ROUTE 11: GET Athor News using: GET Api
router.get("/news/author/:author", authenticate, async (req, res) => {
   // console.log(req.params)
   // res.send(req.params.author)
   try {
      const author = req.params.author;
      console.log(author)
      const data = await News.find({ author })
      console.log(data)
      if (!data) {
         return res.status(404).send();
      } else {
         res.send(data);

      }

   } catch (err) {
      return res.status(500).json({ msg: err.message })
   }


})

//ROUTE 11: Like News using: POST Api

//About us page
router.get('/user', authenticate, (req, res) => {
   // console.log(`hello about`);
   res.send(req.rootUser); //as req.rootuser contains all data of user logged in
});

router.get('/Admin', Adminauthenticate, (req, res) => {
   res.send(req.rootAdmin)
})


//contact us ka page
// router.post('/contact', authenticate, async (req, res) => {
//    try {
//       const { name, email, phone, message } = req.body

//       if (!name || !email || !phone || !message) {
//          console.log(`please fill the complete form `);
//          alert('please fill the complete form')
//          return res.json({ error: "please fill the complete form " })
//       }

//       const userContact = await User.findOne({ _id: req.userID })

//       if (userContact) {
//          const userMessage = await userContact.addMessage(name, email, phone, message)

//          await userContact.save()

//          res.status(201).json({ message: "user message saved sucessfully" })
//       }

//    } catch (error) {
//       console.log(error);

//    }

// });

//Logout us page
router.get('/logout', (req, res) => {
   console.log(`hello logout `);
   res.clearCookie('jwtoken', { path: '/' })
   res.status(200).send('User logout');
});
router.get('/Admin/Logout', (req, res) => {
   console.log(`hello logout `);
   res.clearCookie('admintoken', { path: '/' })
   res.status(200).send('Admin logout');
});

// //ROUTE 2: Get a News using: GET Api
// router.get("/Admin", authenticate, async (rep, res) => {
//    try {
//       const getData = await User.find({});
//       res.status(200).send(getData);
//    } catch (e) {
//       res.status(401).send(e, "Error is Get");
//    }
// });

// //ROUTE 3: Get 1 News using: GET Api
// router.get("Admin/:id", authenticate, async (req, res) => {
//    try {
//       const _id = req.params.id;
//       const data = await User.findById(_id);
//       if (!data) {
//          return res.status(404).send();
//       } else {
//          res.send(data);
//       }
//    } catch (e) {
//       res.status(500).send(e);
//    }
// });



module.exports = router;