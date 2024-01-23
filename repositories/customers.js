import mongoose from "mongoose";

import Customer from "../model/customer.js";
import Fullname from "../model/fullname.js";
import Account from "../model/account.js";
import Address from "../model/address.js";

const getAllCustomer = async () => {
  try {
    const existingCustomers = await Customer.find()
      .populate("fullname")
      .populate("addresses")
      .populate("account")
      .exec();

    const customers = existingCustomers.map((customer) => customer.toObject());

    return customers;
  } catch (error) {
    console.error(exception);
    throw new Error("An error get one customer");
  }
};

const getOneCustomerById = async ({ customerId }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      throw new Error("Invalid customer ID");
    }
    const existingCustomer = await Customer.findById(customerId)
      .populate("fullname")
      .populate("addresses")
      .populate("account")
      .exec();
    if (!existingCustomer) {
      return null;
      throw new Error("Customer not found");
    }

    return {
      ...existingCustomer._doc,
    };
  } catch (error) {
    console.error(exception);
    throw new Error("An error get one customer");
  }
};

const addCustomer = async ({ phone, email, fullname, addresses, account }) => {
  try {
    const existingCustomer = await Customer.findOne({ email }).exec();
    if (existingCustomer) {
      throw new Error("Customer exists");
    }

    const existingAccount = await Account.findOne({
      username: account.username,
    }).exec();
    if (existingAccount) {
      throw new Error("account exists");
    }

    const fullnameModel = new Fullname({
      _id: new mongoose.Types.ObjectId(),
      ...fullname,
    });

    const accountModel = new Account({
      _id: new mongoose.Types.ObjectId(),
      ...account,
    });

    const addressModels = addresses.map(
      ({ street, city }) =>
        new Address({
          _id: new mongoose.Types.ObjectId(),
          street,
          city,
        })
    );

    await Promise.all([
      fullnameModel.save(),
      accountModel.save(),
      Address.insertMany(addressModels),
    ]);

    const newCustomer = await Customer.create({
      _id: new mongoose.Types.ObjectId(),
      phone,
      email,
      fullname: fullnameModel._id,
      addresses: addressModels.map((address) => address._id),
      account: accountModel._id,
    });

    return {
      ...newCustomer._doc,
    };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while adding customer");
  }
};

const editCustomer = async ({
  customerId,
  phone,
  email,
  fullname,
  addresses,
  account,
}) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return null;
      throw new Error("Invalid customer ID");
    }
    const existingCustomer = await Customer.findById(customerId).exec();
    if (!existingCustomer) {
      return null;
      throw new Error("Customer not found");
    }

    existingCustomer.phone = phone || existingCustomer.phone;
    existingCustomer.email = email || existingCustomer.email;

    if (fullname) {
      const existingFullname = await Fullname.findById(
        existingCustomer.fullname
      ).exec();
      if (existingFullname) {
        existingFullname.lastname =
          fullname.lastname || existingFullname.lastname;
        existingFullname.firstname =
          fullname.firstname || existingFullname.firstname;
        existingFullname.middname =
          fullname.middname || existingFullname.middname;

        await existingFullname.save();
      }
    }

    if (account) {
      const existingAccount = await Account.findById(
        existingCustomer.account
      ).exec();
      if (existingAccount) {
        existingAccount.username = account.username || existingAccount.username;
        existingAccount.password = account.password || existingAccount.password;
        existingAccount.role = account.role || existingAccount.role;
        await existingAccount.save();
      }
    }

    if (addresses) {
      existingCustomer.addresses = existingCustomer.addresses || [];

      const newAddressIds = addresses.map(({ id }) => id);

      const addressesToRemove = existingCustomer.addresses.filter(
        (existingAddressId) =>
          !newAddressIds.includes(existingAddressId.toString())
      );

      existingCustomer.addresses = existingCustomer.addresses.filter(
        (existingAddressId) =>
          newAddressIds.includes(existingAddressId.toString())
      );

      await Promise.all(
        addressesToRemove.map(async (addressId) => {
          await Address.findByIdAndDelete(addressId).exec();
        })
      );

      await Promise.all(
        addresses.map(async ({ id, street, city }) => {
          if (id || id === "") {
            const existingAddress = await Address.findById(id).exec();
            if (existingAddress) {
              existingAddress.street = street || existingAddress.street;
              existingAddress.city = city || existingAddress.city;
              await existingAddress.save();
            }
          } else {
            const newAddress = new Address({
              _id: new mongoose.Types.ObjectId(),
              street,
              city,
            });
            await newAddress.save();
            existingCustomer.addresses.push(newAddress.id);

            await existingCustomer.save();
          }
        })
      );
    }

    await Promise.all([existingCustomer.save()]);

    return {
      ...existingCustomer._doc,
    };
  } catch (exception) {
    console.error(exception);
    throw new Error("An error occurred while updating customer");
  }
};

const deletedCustomer = async ({ customerId }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      throw new Error("Invalid customer ID");
    }
    const existingCustomer = await Customer.findById(customerId).exec();
    if (!existingCustomer) {
      throw new Error("Customer not found");
    }

    await Account.findByIdAndDelete(existingCustomer.account).exec();
    await Fullname.findByIdAndDelete(existingCustomer.fullname).exec();

    await Address.deleteMany({
      _id: { $in: existingCustomer.addresses },
    }).exec();
    await Customer.findByIdAndDelete(customerId).exec();

    return {
      ...existingCustomer._doc,
    };
  } catch (error) {
    console.error(exception);
    throw new Error("An error delete customer");
  }
};
export {
  getAllCustomer,
  addCustomer,
  getOneCustomerById,
  editCustomer,
  deletedCustomer,
};
