require('dotenv').config();  //Config dotenv module - Load .env files
const logger = require("./logger"); //define Winston Logger Module
const copyDir = require("./Fnc_Copy_files");

//get env params
const src_dir_path = process.env.SRC_DIR_PATH ;
const trgt_dir_path = process.env.TRGT_DIR_PATH;

logger.error(`App.js>> Try copy files from '${src_dir_path}' to '${trgt_dir_path}'`);  // why logger.info doesn't works
// Get Function for Recursive Copy all Files of source directory
const start = async () => {
    try {
        let result = await copyDir(src_dir_path, trgt_dir_path);
        console.log(`Number of directories created: '${result.cre_dirs_counter}'`) ;
        console.log(`Number of files copied: '${result.files_counter}'`) ;
        logger.info(`Number of directories created: '${result.cre_dirs_counter}'`);
        logger.info(`Number of files copied: '${result.files_counter}'`);
    } catch (err) {
        logger.error("copyDir Error: Faild To Copy Files");
        
    }
}

start();