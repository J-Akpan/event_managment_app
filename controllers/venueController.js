//import the neede moduls
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Event = require("../models/Events");
const Venue = require("../models/Venues");
const { Op } = require("sequelize");
const {
  venueCreateValidation,
  venueSearchValidation,
} = require("../validation/venueValidation");

allVenues = async (req, res) => {
  try {
    const venueOwners = await User.findAll({
      where: { userType: "Venue Owner" },
    });
    res.status(200).json(venueOwners);
  } catch (error) {
    throw error;
  }
};

venueInfo = async (req, res) => {
  try {
    const venueOwner = req.user.userId;
    // console.log(venueOwner)

    const venueInfos = await Venue.findAll({
      include: User,
      where: { userId: venueOwner },
    });
    if (venueInfos) {
      return res.status(200).json(venueInfos);
    }
  } catch (error) {
    throw error;
  }
};

createVenue = async (req, res) => {
  try {
    const venueOwner = req.user.userId;
    const { location, capacity, amenities, availability } = req.body;

    // validation of the request body
    const { error } = venueCreateValidation.validate(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }

    const venueExists = await Venue.findOne({
      where: { userId: venueOwner },
    });
    if (venueExists)
      return res.status(404).json({ msg: "Venue already exists" });

    const createVenue = await Venue.create({
      where: { userId: venueOwner },
      userId: venueOwner,
      location,
      capacity,
      amenities,
      availability,
    });

    // console.log(createVenue)

    if (createVenue) {
      return res.status(500).json({ msg: "Venue created successfully" });
    }
    return res.status(201).json({ msg: "Venue created successfully" });
  } catch (error) {
    throw error;
  }
};

// -------delete venue------
deleteVenue = async (req, res) => {
  const venueOwner = req.user.userId;
  // console.log(venueOwner);

  const delVenue = await Venue.destroy({
    where: { userId: venueOwner },
  });

  if (!delVenue) {
    return res.status(404).json({ msg: "Venue not found" });
  }

  return res.status(200).json({ msg: "Venue deleted successfully" });
};

// --------------------search Venue -------------------------
searchVenue = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // validation of the request body
    const { error } = venueSearchValidation.validate(req.body);
    if (error) {
      return res.json(error.details[0].message);
    }
    // console.log(searchTerm)

    const search = await Venue.findAll({
      where: {
        [Op.or]: [
          {
            location: { [Op.iLike]: `%${searchTerm}%` },
          },
          { capacity: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });

    if (search) {
      return res.status(200).json(search);
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error" }, error.message);
  }
};

module.exports = {
  allVenues,
  createVenue,
  venueInfo,
  deleteVenue,
  searchVenue,
};
