require("./src")().catch((err) => {
  console.error(err);
  process.exit(1);
});
