//import the neede moduls
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Artist = require('../models/Artist')
const { Op } = require('sequelize')
const { regValidation,
    loginValidation,
    updateValidation,
    passwordValidation
} = require('../validation/userValidation')


// Get all users
welcome = async (req, res) => {
    const user = await User.findAll({include: Artist})
    return res.json(user)
    // console.log(user)

}

// -------------------------Register----------------------------
//register
register = async (req, res) => {
    const { username, password, email, userType} = req.body
    const { error } = regValidation.validate(req.body)
    if (error) {
        return res.status(404).json(error.details[0].message);
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const userExist = await User.findOne({
            where: { [Op.or]: [{ email }, { username }] }
        })
        if (userExist) {
            return res.status(200).json({ msg: 'User with these username or email  alredady exist' })
        }
       
        //create users
        const createUser = await User.create({
            username,
            email,
            password: hashedPassword,
            userType
        })
        // check if user exist
        if (!createUser) {
            return res.status(401).json({ msg: 'Failed to create a user' })
        }
        return res.status(201).json({ msg: 'User created successfully' })

    } catch (error) {
        throw error

    }
}

// ------------------------login-------------------------------
login = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error } = loginValidation.validate(req.body)
        if (error) { return res.json(error.details[0].message) }

        // check for correct details
        const userExist = await User.findOne({ where: { email } })
        if (!userExist) {
            return res.status(404).json({ msg: "User not found on the database" })
        }

        // compare password
        const passwordCheck = await bcrypt.compare(password, userExist.password)
        if (!passwordCheck) {
            return res.json({ msg: 'incorrect password or username' })
        }

        const loginToken = jwt.sign(
            { userId: userExist.userId, username: userExist.username, email: userExist.email, userType: userExist.userType },
            process.env.privateKey,
            { expiresIn: '1h' }
        )
        return res.status(200).json({
            loginToken,
            userId: userExist.userId,
            firstname: userExist.firstName,
            email: userExist.email,
            username: userExist.username,
            userType: userExist.userType,

        })


    } catch (error) {
        throw error

    }

}


// ------------------ Update details ----------------------
updateDetails = async (req, res) => {
    try {
        const userId = req.user.userId
        const { firstName, lastName, role } = req.body
        const userExist = await User.findByPk(userId)
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" })
        }
        const { error } = updateValidation.validate(req.body)
        if (error) { return res.json(error.details[0].message) }

        const updateInfo = await User.update(
            {
                firstName,
                lastName,
            },
            {
                where: { userId }
            }
        )
        if (updateInfo) {
            return res.status(201).json({ msg: "User details updated successfully " })
        }

    } catch (error) {
        throw error
    }

}

const passwordUpdate = async (req, res) => {
    const userId = req.user.userId

    try {
        const { newPassword, confirmPassword } = req.body
        const { error } = passwordValidation.validate(req.body)
        if (error) { return res.json(error.details[0].message) }
        if (newPassword !== confirmPassword) {
            res.json({ msg: "Password not match" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const update = await User.update(
            { password: hashedPassword },
            {
                where: { userId }
            }
        )
        if (update) {
            return res.status(201).json({ msg: "Password updated successfully" })
        }
    } catch (error) {
        throw error

    }
}


// ---------------------forgot password ----------------------



module.exports = {
    passwordUpdate,
    welcome,
    register,
    login,
    updateDetails
}









// let transporter = await nodemailer.createTransport({
//     host: "smtp.gmail.com", //mail.skilltopims.com
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   //     const formLink = ""

//   let mailOptions = await {
//     from: {
//       name: "SERVICE PASSWORD RESET LINK",
//       address: process.env.EMAIL_USER,
//     },
//     to: user.email,
//     subject: "Service Password Reset link",
//     text: `You have made a request to change a password. Kindly Click on the link to proceed with the password reset`,
//     html: ` <div style="font-family: Arial, sans-serif; color: #333;">
//     <h2>Password Reset Request</h2>
//     <p>Hello,</p>
//     <p>We received a request to reset your password for your IMS account. If you made this request, please click the button below to reset your password:</p>
//     <a href="${process.env.CLIENT2_URL}/passwordConfirmation?token=${randomText}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
//     <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
//     <p>Best regards,<br/>App Service Support Team</p>
//     </div>`,
//   };
//   res.json({
//     msg: "An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.",
//   });
//   return await transporter.sendMail(mailOptions);
// } catch (error) {
//   throw error;
// }

// };