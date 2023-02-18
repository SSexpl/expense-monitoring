var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tutorial_d', {useNewUrlParser: true});

var tSchema = new mongoose.Schema({
            request_id:
            {
                type:String,
                required:true
            },
            title: 
                {type:String,
                required:true
                },
            description:
            {type:String,
                required:true
                },
            price:
            {
              type:Number,
              required:true
            },
            quantity:
            {
                type:Number,
                required:true
            },
            amount:
            {
                type:Number
            },
            date:
            {
               type: String
            }
        });

var content =mongoose.model('content',tSchema);
module.exports =content;