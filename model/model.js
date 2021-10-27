const Mongoose=require('mongoose')

const UserSchema = new Mongoose.Schema({
    email:{type:String, unique:true, required:true},
    voter_id:{type:String, unique:true, required:true},
    password:{type: String,required:true},
    name:{type:String},
    voted:{type:Boolean, default:false}
})

const CandidateSchema = new Mongoose.Schema({
    candidate_id:{type:String, unique:true, required:true},
    candidate_name:{type:String},
    no_of_votes:{type:Number, default:0}
})

const Usermodel=Mongoose.model('users',UserSchema);
const Candidatemodel=Mongoose.model('candidates',CandidateSchema);

module.exports=
{
    Usermodel,
    Candidatemodel
}