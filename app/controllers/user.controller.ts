import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errors, success } from "../constants";
import models from "../models";
const User = models.user;

// Returns a list of users
export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: errors.user.usersServer });
  }
};

// updates the user's balance
export const updateBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, amount } = req.body;

  // Check if amount is a positive number
  if (amount <= 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: errors.user.amount });
    return;
  }

  const t = await User.sequelize.transaction();

  try {
    // Find User by id
    const user = await User.findOne({
      where: { id: userId },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    // Check if the user is found by id
    if (!user) {
      t.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: errors.user.userNotFound });
      return;
    }

    // Check if the user has enough balance
    if (user.balance < amount) {
      t.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: errors.user.insufficientFunds });
      return;
    }

    //Calculate and save the new balance
    user.balance -= amount;
    await user.save({ transaction: t });

    await t.commit();

    res.json({ message: success.user.balanceUpdated });
    return;
  } catch (error) {
    await t.rollback();
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errors.user.updateBalanceServer });
  }
};
