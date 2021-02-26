const {Schema,model} = require("mongoose")
const bcrypt= require("bcrypt")

const UserSchema = new Schema({
    name:{type:String},
    surname: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String },
	image: {
		type: String,
		default:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
	},
	// role: { type: Number, default: 0 }, //0:user, 1: admin
	googleId: { type: String },

	refreshTokens: [{ token: String }],
})

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObj = user.toObject();

	delete userObj.password;
	delete userObj.__v;

	delete userObj.googleId;


	return userObj;
};
UserSchema.statics.findByCredentials = async function(email,plainPw){
    const user = await this.findOne({email})
  
        if(user){
          const isMatch = await bcrypt.compare(plainPw,user.password)
          if(isMatch){
            return user
           }else{
             return null
           }
        }else{
          return null
        }
  }

UserSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

const User = model("User", UserSchema);

module.exports = User;