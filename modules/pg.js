const fs = require("fs");
const path = require("path");

module.exports = {
    name: "PostgreSQL",
    description: "PostgreSQL database module",
    dependencies: {
        "pg": "^8.11.5"
    },
    devDependencies: {
        "@types/pg": "^8.11.6"
    },
    version: "1.0.0",
    patch: () => {
        fs.cpSync(path.join(__dirname, "..", "dist", "Database.js"), path.join(process.cwd(), "Database.js"));
    }
}