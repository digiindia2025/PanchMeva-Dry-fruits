const fs = require("fs");
const path = require("path");

const deleteLocalFile = (filePath) => {
    try {
        const fileToDelete = path.join(__dirname, "..", filePath);
        fs.unlinkSync(fileToDelete);
    } catch (error) {
        console.error("Failed to delete local file:", error.message);
    }
};

module.exports = { deleteLocalFile }