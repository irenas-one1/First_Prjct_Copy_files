const fs = require('fs');
const path = require('path');
const logger = require("./logger");
let files_counter = 0;
let cre_dirs_counter = 0;

async function copyDir(source, destination) {
  try {
    // Check if source directory exists    
    if (!fs.existsSync(source)) {
      logger.error(`Fnc_CopyDir>> Source directory '${source}' does not exist`);
      return;
    }

    // Check if destination directory exists, create it if it doesn't
    if (!fs.existsSync(destination)) {
       fs.mkdirSync(destination);
       cre_dirs_counter++;
       logger.error(`Fnc_CopyDir>> Created directory '${destination}'`);
    }
   
    // Get all files in source directory
    const files = fs.readdirSync(source);

    // Loop through files and copy them to destination directory
    // for (const file of files) {
    files.forEach(file => {
      const src_dir_path = path.join(source, file);
      const trgt_dir_path = path.join(destination, file);

      // Check if file is a directory
      if (fs.statSync(src_dir_path).isDirectory()) {
        // Recursively copy directory
        copyDir(src_dir_path, trgt_dir_path);
      } else {
        // Copy file
        fs.copyFileSync(src_dir_path, trgt_dir_path);
        files_counter++; 
      }
    })
    return{cre_dirs_counter,files_counter};
  } catch (err) {
    logger.error(`Fnc_CopyDir>> Error copying files from '${source}' to '${destination}': ${err}`);
  }
}
module.exports = copyDir;
