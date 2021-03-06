/* eslint-disable */
import db from "db";

const { TEARDOWN, WATCHING } = process.env;

const teardownDB = async () => {
  await db.task("teardown-db", async dbtask => {
    try {
      await dbtask.none(`
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS subscribers;
        DROP TABLE IF EXISTS plans;
        DROP TABLE IF EXISTS promotionals;
        DROP TABLE IF EXISTS transactions;
        DROP TABLE IF EXISTS templates;
        DROP TABLE IF EXISTS notifications;
        DROP TABLE IF EXISTS messages;
        DROP TABLE IF EXISTS avatars;
        DROP TABLE IF EXISTS feedback;
        `);

      return console.log(
        "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mteardownDB.js"
      );
    } catch (err) {
      return console.log(
        `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mteardownDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`
      );
    } finally {
      if (TEARDOWN) process.exit(0);
      if (!WATCHING) {
        db.$pool.end();
        process.exit(0);
      }
    }
  });
};

if (TEARDOWN) teardownDB();

export default teardownDB;
/* eslint-enable */
