// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from 'http-status-codes'

const access = async (req, res) => {
  try {
    // const user = { email: 'trungquandev.official@gmail.com' }
    const userInfor = {
      id: req.jwtDecoded.id,
      email: req.jwtDecoded.email,
      role: req.jwtDecoded.role
    }

    res.status(StatusCodes.OK).json(userInfor)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const dashboardController = {
  access
}
