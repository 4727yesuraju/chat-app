import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export async function signup(req,res){
    try {
        const {fullName, username, password, confirmPassword,gender} = req.body;

        console.log(req.body);
        if(password !== confirmPassword)
            return res.status(400).json({error : "Password don't match"});

        const user = await User.findOne({username});

        if(user)
            return res.status(400).json({error : "Username already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //https://avatar.iran.liara.run/public/boy?username=yesu1
        const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
    
            res.status(201).json({
                _id : newUser._id,
                fullName :newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic
            })
        }else{
            res.status(400).json({error : "Invalid user data"});
        }

       
    } catch (error) {
        res.status(500).json({error: "while signup : "+error.message});
    }
}

export async function login(req,res){
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isValidPassword = await bcrypt.compare(password,user?.password || "");
        if(!isValidPassword || !user)
            return res.status(400).json({error : "Invalid credentials"});
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            username : user.username,
            profilePic : user.profilePic
        })
    } catch (error) {
        res.status(500).json({error : "while login : "+error.message});
    }
}

export async function logout(req,res){
    try {
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({message : "Logged out successfully"});
    } catch (error) {
        res.status(500).json({error : "while logout : "+error.message});
    }
}