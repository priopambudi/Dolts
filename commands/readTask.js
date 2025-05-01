import chalk from "chalk";
import ora from "ora";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";

export const readTask = async () => {
  try {
    await connectDB();
    const spinner = ora("Reading todos from db...").start();

    const todos = await Todos.find({});
    spinner.stop();

    if (todos.length <= 0) {
      console.log(chalk.redBright("No todos in your database"));
    } else {
      todos.forEach((todo) => {
        console.log(
          chalk.cyanBright("Todo Code: ") +
            todo.code +
            "\n" +
            chalk.green("Name: ") +
            todo.name +
            "\n" +
            chalk.yellowBright("Description: ") +
            todo.detail +
            "\n"
        );
      });
    }

    await disconnectDB();
  } catch (error) {
    console.log(chalk.redBright("Something went wrong, Error: ", error));
    process.exit(1);
  }
};
