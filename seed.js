var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name:"Camp Exotica",
        image:"https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"West Ladakh Camp", 
        image:"https://www.holidify.com/images/cmsuploads/compressed/24366507140_38f32204a4_z_20190212174301.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Taj Banjar Tola", 
        image:"https://www.holidify.com/images/cmsuploads/compressed/banjar-tola_20190213130539.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]
function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed All Campgrounds!");
    });

//     //ADD NEW CAMPGROUNDS
//     data.forEach(function(seed){
//         Campground.create(seed, function(err, campground){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Added Campgournd!");
//                 //ADD NEW COMMENTS
//                 Comment.create(
//                 {
//                     text: "This place is cool, but I wish there is internet",
//                     author:"Homer"
//                 }, function(err, comment){
//                     if(err){
//                         console.log("Error here : "+err);
//                     }else{
//                         campground.comments.push(comment);
//                         campground.save();
//                         console.log("Comment added!");
//                     }
//                 })
//             }
//         });
//     });
    
 };

module.exports = seedDB;