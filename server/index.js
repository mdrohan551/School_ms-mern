import app from "./app.js";
import { PORT } from "./src/config/config.js";
import connectDB from "./src/config/conectDB.js";
import figlet from "figlet";
import chalk from 'chalk';

connectDB().then(() => {
  app.listen(PORT, () => {
    figlet('M E R N TEAM ', (err, data) => {
        console.log(chalk.green(data));
      console.log(chalk.green(`http://localhost:${chalk.blueBright(PORT)}`));
    });
  });
});
