import mongoose from 'mongoose'
import moment from 'moment'

const BoardSchema = mongoose.Schema({
    type : {type : String},
    title : {type : String},
    contents : {type : String},
    attach : [{type : String}],
    regDate : {type : String, default : moment().format('YYYY.MM.DD')},
    status : {type : String},
    process : {type : String},
    salesNum : {type : String},
    userID : {type : String},
    userPhone : {type : String},
    userEmail : {type : String},
    reply : [
        new mongoose.Schema({
            title : {type : String},
            contents : {type : String},
            regDate : {type : String},
            userID : {type : String}
        },{_id: false})
    ]
}, {collection : 'board'});

let BoardModel = {};




export default BoardModel;



