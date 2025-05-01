#!/usr/bin/env node

import { addTask } from "./commands/addTask.js";
import { readTask } from "./commands/readTask.js";
import { updateTask } from "./commands/updateTask.js";
import { deleteTask } from "./commands/deleteTask.js";
import { Command } from "commander";

const program = new Command();

program
  .name("ticktask")
  .description("Your terminal task manager!")
  .version("1.0.0");
program.command("add").description("Create a new task").action(addTask);
program.command("read").description("Read task").action(readTask);
program.command("update").description("Update Task").action(updateTask);
program.command("delete").description("Delete Task").action(deleteTask);

program.parse();
