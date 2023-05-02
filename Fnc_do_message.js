const cre_log_t_f = process.env.cre_log_t_f;
const logger = require("./logger");

function do_message(v_err,v_msg_data){

if (cre_log_t_f == "true"){
    if (v_err == 0){
       logger.info(v_msg_data);
    }else{
       logger.error(v_msg_data);
    }
  }
  else{
    console.log(v_msg_data);
  }
}
  module.exports = do_message;