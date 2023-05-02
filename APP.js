require('dotenv').config();  //Config dotenv module - Load .env files
const logger = require("./logger"); //define Winston Logger Module
const copyDir = require("./Fnc_Copy_Files");
const do_message = require("./Fnc_do_message");

//get env params
const cre_log_t_f = process.env.cre_log_t_f;
const log_file_path = process.env.log_file_path;

//get command line parameters
// const process = require('process');
const src_dir_path = process.argv[2];
const trgt_dir_path = process.argv[3];

if (cre_log_t_f == "true" && log_file_path == "") {
   console.log("Environment Parameter is missing - log_file_path - Path to Log File");
   return;
}

if (src_dir_path == ""){
  v_msg_data = "Parameter Command Line is missing: Source Dir Location";
  do_message(-1,v_msg_data);
  return;  
}

if (trgt_dir_path == ""){
  v_msg_data = "Parameter Command Line is missing: Target Dir Location";
  do_message(-1,v_msg_data);
  return;  
}

v_msg_data = `App.js>> Try copy files from '${src_dir_path}' to '${trgt_dir_path}'`;
do_message(0,v_msg_data);

// Get Function for Recursive Copy all Files of source directory
const start = async () => {
    try {
        let result = await copyDir(src_dir_path, trgt_dir_path);

        v_msg_data = `Number of directories created: '${result.cre_dirs_counter}'`;
        do_message(0,v_msg_data);
 
        v_msg_data = `Number of files copied: '${result.files_counter}'`;
        do_message(0,v_msg_data);

    } catch (err) {

      v_msg_data = "copyDir Error: Faild To Copy Files";
      do_message(-1,v_msg_data);
     
    }
}

start();