import User from "../model/user.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";



export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Password & confirmPassword didn't match "
            });
        }
        // check if userName already exists (needs to be unique)
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({
                error: 'Username already exist'
            })
        }

        //     TODO: hash password here 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // RANDOM PROFILE PIC (using this free api - https://avatar.iran.liara.run/)
        // for male  -> https://avatar.iran.liara.run/public/boy?username=[value]
        // for female  -> https://avatar.iran.liara.run/public/girl?username=[value]

        // const maleDP = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        // const femaleDP = `https://avatar.iran.liara.run/public/girl?username=${userName}`




        // change of plans now using "RoboHash" for profile pic 
        // for male -> some weird alien LOL
        // for female -> cats

        const maleDP = `https://robohash.org/${userName}?set=set2`;
        const femaleDP = `https://robohash.org/${userName}?set=set4`;


        // creating new user to save in DB (MongoDB)
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? maleDP : femaleDP
        })

        //  if newUser got created succesfully then save it to database 
        if (newUser) {
            //  TODO: generate JWT token 

            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic

            })
        } else {
            return res.status(400).json({
                error: 'Invalid user data'
            })
             
        }


    } catch (error) {
        console.log('error while signing up in signup controller : ', error);
        res.status(500).json({
            error: 'Internal server error'
        })

    }
}


export const login = async (req, res) => {

    try {
        // get the username password from req body 
        const { userName, password } = req.body;
        // check if user Exist with that username or not 
        const user = await User.findOne({ userName });
        // if user exists then compare hashed pw  from db with the req. body password
        // if user does not exist we will put password as empty string and that will make  the login fail in next step 
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        // if user is legit then generate token and set it to cookies
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.userName,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error during login in loginController", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export const logout = (req, res) => {
    try {
        // empty up the cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

