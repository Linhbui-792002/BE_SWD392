import { loginAccount } from "../repositories/auth.js";

const login = async (req, res) => {
  try {
    const login = await loginAccount({ ...req.body });
    if (login) {
      res.status(200).json({
        status: 200,
        message: "login successfully",
        data: login,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "login faile",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};

export { login };
