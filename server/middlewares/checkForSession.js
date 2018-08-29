
module.exports = function(req, res, next) {
  const { session } = req;    // <-- OBJECT DES

  if(!session.user) {         // <-- CHECK IF THERE SESSION EXIST IF NOT CREATE ONE
    session.user = { username: '', cart: [], total: 0}  
  }

  next();                     // <-- AFTER FINSH LAST FUNCTION . IT WILL GO TO NEXT FUNCTION OR STEP
}
