const mongoose = require("mongoose");

 const reservationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requires:true,
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status:{
        type: String,
        enum:["waiting", "notified", "fulfiled", "cancelled"],
        default:"waiting",
    },
    notifiedAt:{
        type:Date,
        default: null,
    },
 },{
    timestamps: true
 });


 reservationSchema.index({book: 1, status: 1, createdAt:1});

 module.exports = mongoose.model("Reservation", reservationSchema);