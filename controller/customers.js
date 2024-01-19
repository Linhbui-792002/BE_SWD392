import {
  addCustomer,
  editCustomer,
  deletedCustomer,
  getOneCustomerById,
  getAllCustomer,
} from "../repositories/customers.js";

const getListCustomer = async (req, res) => {
  try {
    const listCustomer = await getAllCustomer();
    res.status(200).json({
      status: 200,
      message: "get list customer successfully",
      data: listCustomer,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
    });
  }
};
const getOneCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await getOneCustomerById({ customerId });
    res.status(200).json({
      status: 200,
      message: "get one customer successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
    });
  }
};
const createCustomer = async (req, res) => {
  try {
    const customer = await addCustomer(req.body);

    res.status(200).json({
      status: 200,
      message: "insert successfully",
      data: customer,
    });
  } catch (exception) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await editCustomer({ customerId, ...req.body });
    res.status(200).json({
      status: 200,
      message: "update successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await deletedCustomer({ customerId });
    res.status(200).json({
      status: 200,
      message: "delete customer successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: exception.toString(),
    });
  }
};

export {
  getListCustomer,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
