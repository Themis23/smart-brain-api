const handleApiCall = (req,res) =>{
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => response.json())
    .then(data =>res.json(data))
    .catch(err => res.status(400).json("unable to work with API"))
 }

const returnClarifaiRequestOptions = (imageUrl) =>{
    const PAT = process.env.CLARIFAI_PAT ;
    const USER_ID = process.env.CLARIFAI_USER_ID;   
    const APP_ID = 'my-first-application';
    const IMAGE_URL = imageUrl;    
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
  
    return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
}


const handleImage = (req,res,db)=>{

    const {id} = req.body
    db("users").where('id', '=', id)
    .increment("entries",1)
    .returning("entries")
    .then(entries =>{
         res.json(entries[0].entries)
    })
    .catch(err =>res.status(400).json("unable to get entries"))


}



module.exports.handleApiCall = handleApiCall;
module.exports.handleImage = handleImage;