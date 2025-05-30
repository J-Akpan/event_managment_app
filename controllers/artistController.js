//import the neede moduls
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Artist = require('../models/Artist')
const { Op } = require('sequelize')
const {artistUpdateValidation, artistSearchValidation} = require('../validation/artistValidation')

//check for the registered user is an artist using the user token ==> if yes
//update the artist details

const allArtist = async (req,res) => {
    try {
        const allArtists = await User.findAll(
            {
                where: {userType: "Artist"},}
            )
        if(allArtists){
            return res.status(200).json(allArtists)
        }
    } catch (error) {
        throw error
    }  
}

//-------------------get all users with artist information-------------------
const artistInfo = async (req,res) => {
    try {
        const infor = req.user.userId
        // console.log(infor)
        
        const artistInfos = await Artist.findOne({
            include: User,
            where:{userId: infor},
          
        })


        if (artistInfos.User.userType !== "Artist") return res.status(403).json({
            msg: "You are not an artist"
        })

        if (artistInfo){
            return res.status(200).json(artistInfos)
        }
    
      
    } catch (error) {
        throw error
    }  
}

// ------------------creat artist details -------------------

const artistDetailsUpdate = async (req, res) =>{
    try {
        const loggedInArtist = req.user.userId
        const {genre, portforlioLink} = req.body

    //------------validate user details --------------
    const { error } = artistUpdateValidation.validate(req.body)
    if (error) { return res.json(error.details[0].message) }

    const ifUserExist =await User.findOne({
        where: {userId: loggedInArtist}
    })
    if(!ifUserExist){return res.status(404).json({msg: "User not in Database"})}

    
    const ifExist =await Artist.findOne({
        where: {userId: loggedInArtist}
    })
    if(ifExist){return res.status(200).json({msg : "User Exist already"}) }

    const detailsUpdate =await Artist.create({
        userId: loggedInArtist,
        genre: genre,
        portforlioLink: portforlioLink
    })
    if (detailsUpdate){
        return res.status(201).json({msg: "Artist details updated successfully"})
    }
    
        
    } catch (error) {
        throw error
        
    }   
}

deleteArtist = async (req, res) =>{
    const infor = req.user.userId

    const delArtist = await User.destroy({
        where: {userId: infor}
    })
    if(delArtist){return res.status(200).json({msg: 'Artist deleted successfully'})}
    return res.status(404).json({msg: "Artist not found in database"})
}

// --------------------search Venue -------------------------
searchArtist = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // validation of the request body
    const { error } = artistSearchValidation.validate(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }
    // console.log(searchTerm)

    const search = await Artist.findAll({
        include: User,
      where: {
        [Op.or]: [
          {
            genre: { [Op.iLike]: `%${searchTerm}%` },
          },
        //   { capacity: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });

    if (search) {
      return res.status(200).json(search);
    }
  } catch (error) {
    throw error
  }
};




module.exports ={
    allArtist,
    artistDetailsUpdate,
    artistInfo,
    deleteArtist,
    searchArtist
}