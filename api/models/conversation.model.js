import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Message',
            default : [],
        }
    ]
},{timestamps : true});

const Conversation = mongoose.model("Conversation",conversationSchema);

export default Conversation ; 


// {
//     metadata:{
//         referenceNumber:"",
//             module:"loads",
//             companyId:"",
//             userId:"",
//             name:"",
//             chatId:""
//     }
//     timestamp:"",
//     values:[
//         {
//             question:"",
//             answer:""
//             timestamp:""
//         },
//       {
//             question:"",
//             answer:""
//             timestamp:""
//         }
//     ]
// }
