const bcryptjs = require('bcryptjs');
const {Schema, model} =  require('mongoose');;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});
userSchema.methods.encryptPassword = async(password)=>{
   const salt = await bcryptjs.genSalt(10) //Hash que aplica el algoritmo cuantas veces
   return await bcryptjs.hashSync(password, salt);
};

userSchema.methods.validatePassword =  function(password){
return bcryptjs.compare(password, this.password);
}
module.exports=model('User', userSchema);



