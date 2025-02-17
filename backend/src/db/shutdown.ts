import type { Server } from "node:http";
import type { Knex } from "knex";

type ExitFunction = (code: number, reason: string) => Promise<void>;

export default function shutdown(
  server: Server,
  db: Knex,
  options: { coredump: boolean; timeout: number } = { coredump: false, timeout: 500 }
): void {
  const exit: ExitFunction = async (code, reason) => {
    console.log(`Shutting down due to: ${reason}`);

    try {
      await db.destroy();
      console.log("Knex connection closed.");
    } catch (err) {
      console.error("Error during Knex disconnection:", err);
      code = 1;
    } finally {
      if (options.coredump) {
        console.log("Aborting process.");
        process.abort();
      } else {
        console.log("Exiting process with code:", code);
        process.exit(code);
      }
    }
  };

  const handleExit = (code: number, reason: string) => (err?: Error): void => {
    if (err != null) {
      console.error(`Error: ${reason}`, err.message, err.stack);
    }

    // Fecha o servidor antes de encerrar
    server.close((serverErr) => {
      if (serverErr != null) {
        console.error("Error during server close:", serverErr);
      }
      exit(code, reason).catch((exitErr) => {
        console.error("Error during shutdown:", exitErr);
      });
    });

    setTimeout(() => {
      void exit(code, reason);
    }, options.timeout).unref();
  };

  process.on("uncaughtException", handleExit(1, "Unexpected Error"));
  process.on("unhandledRejection", handleExit(1, "Unhandled Promise Rejection"));
  process.on("SIGTERM", handleExit(0, "SIGTERM"));
  process.on("SIGINT", handleExit(0, "SIGINT"));
}
