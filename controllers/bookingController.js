//import the neede moduls
const jwt = require('jsonwebtoken')
const User = require('../models/User')
// const {Events, Venues, Bookings, Artist} = require('../models')
const Event = require('../models/Events')
const Artist = require('../models/Artist')
const Venue = require('../models/Venues')
const { Op } = require('sequelize')


   //---------------------- create Booking -----------------------
    createBooking = async (req,res, eventId, artistId, venueId) =>{
    try {
        // Step 1: Find the event, artist, and venue
        const event = await Event.findByPk(eventId);
        console.log(event)

        const artist = await Artist.findByPk(artistId);
        console.log(event)

        const venue = await Venue.findByPk(venueId);
        console.log(event)




    } catch (error) {
    throw error
}
}


//   if (!event || !artist || !venue) {
//     throw new Error('Event, Artist, or Venue not found');
//   }

//   // Step 2: Generate contract
//   const contract = generateContract(event, artist, venue);

//   // Step 3: Create a booking
//   const booking = await Booking.create({
//     eventId: event.id,
//     artistId: artist.id,
//     venueId: venue.id,
//     status: 'pending',
//     contract: contract,
//   });

//   // Step 4: Send contract for approval (mock function)
//   await sendContractForApproval(booking);

//   return booking;
// }

// function generateContract(event, artist, venue) {
//   return `
//     Contract for Event: ${event.name}
//     Artist: ${artist.name}
//     Venue: ${venue.name}
//     Date: ${event.date}
//     Time: ${event.time}
//     Terms: Please review and approve.
//   `;
// }

// async function approveBooking(bookingId) {
//   const booking = await Booking.findByPk(bookingId);
  
//   if (!booking) {
//     throw new Error('Booking not found');
//   }

//   // Step 5: Update booking status to confirmed
//   booking.status = 'confirmed';
//   await booking.save();

//   // Step 6: Notify users (mock function)
//   await notifyUsers(booking);

//   return booking;
// }

// async function rejectBooking(bookingId) {
//   const booking = await Booking.findByPk(bookingId);
  
//   if (!booking) {
//     throw new Error('Booking not found');
//   }

//   // Update booking status to rejected
//   booking.status = 'rejected';
//   await booking.save();

//   return booking;
// }

// // Mock functions for sending notifications and approvals
// async function sendContractForApproval(booking) {
//   console.log(`Sending contract for Booking ID: ${booking.id}`);
// }

// async function notifyUsers(booking) {
//   console.log(`Notifying users about Booking ID: ${booking.id}`);
// }

// module.exports = {
//   createBooking,
//   approveBooking,
//   rejectBooking,



// const bookingService = require('./services/bookingService');

// async function bookEvent() {
//   try {
//     const booking = await bookingService.createBooking(1, 1, 1); // Event ID, Artist ID, Venue ID
//     console.log('Booking created:', booking);
    
//     // Later, when the contract is approved
//     const confirmedBooking = await bookingService.approveBooking(booking.id);
//     console.log('Booking confirmed:', confirmedBooking);
    
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// bookEvent();

// };
