import chalk from "chalk";
import { getTaskCode } from "./deleteTask.js";
import inquirer from "inquirer";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import { connectDB, disconnectDB } from "../db/connectDB.js";

const updateTaskQ = async (todo) => {
  try {
    const update = inquirer.prompt([
      {
        name: "name",
        message: "Update your name?",
        type: "input",
        default: todo.name,
      },
      {
        name: "detail",
        message: "Update your detail?",
        type: "input",
        default: todo.detail,
      },
      {
        name: "status",
        message: "Update your status?",
        type: "input",
        default: todo.status,
      },
    ]);

    return update;
  } catch (error) {
    console.log(chalk.redBright("Something went wrong, Error: ", error));
    process.exit(1);
  }
};

export const updateTask = async () => {
  try {
    const userCode = await getTaskCode();

    await connectDB();
    const spinner = ora("Finding the todo..." + "\n").start();
    const todo = await Todos.findOne({ code: userCode.code });

    if (!todo) {
      console.log(
        chalk.redBright("Could not find a Todo with the code you provided.")
      );
      spinner.stop();
      process.exit(1);
    } else {
      spinner.stop();
      console.log(
        chalk.blueBright(
          "Type the updated properties. Press Enter if you don't want to update the data."
        )
      );
      const update = await updateTaskQ(todo);

      spinner.text = "Updating the todo";
      spinner.start();

      await Todos.updateOne({ _id: todo._id }, update, {
        runValidators: true,
      });

      spinner.stop();
      console.log(chalk.greenBright("Updated the todo."));
      await disconnectDB();
    }
  } catch (error) {
    console.log(chalk.redBright("Something went wrong, Error: ", error));
    process.exit(1);
  }
};
