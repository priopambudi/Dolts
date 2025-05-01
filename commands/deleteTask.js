import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";

export async function getTaskCode() {
  try {
    const answers = await inquirer.prompt([
      { name: "code", message: "Enter the code of the todo: ", type: "input" },
    ]);

    answers.code = answers.code.trim();

    return answers;
  } catch (error) {
    console.log(chalk.redBright("Something went wrong, Error: ", error));
  }
}

export const deleteTask = async () => {
  try {
    const userCode = await getTaskCode();

    await connectDB();
    const spinner = ora("Finding and Deleting the todo...").start();

    const response = await Todos.findOneAndDelete({ code: userCode.code });

    spinner.stop();

    if (response) {
      console.log(chalk.greenBright("Deleted Task Successfully"));
    } else {
      console.log(
        chalk.redBright(
          "Could not find any todo matching the provided name. Deletion failed."
        )
      );
    }

    await disconnectDB();
  } catch (error) {
    console.log(chalk.redBright("Something went wrong, Error: ", error));
    process.exit(1);
  }
};
