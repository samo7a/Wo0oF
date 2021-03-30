// Create Dog Function
exports.createDog = function(req, res) 
{
  // incoming: Dog Name, password
  // outgoing: id, firstName, lastName, error
  
	var { Name, UserID, Bio, Breed, Weight, Height, Age, Sex } = req.body;

  console.log("Json package: " + req.body + "UserID: " + UserID);
  // Complete reportAccounts API

  var DogID = DogCounter++;
  const newDog = { DogID: DogID, Name: Name, Bio: Bio, Breed: Breed, Weight: Weight, Height: Height, Age: Age, Sex: Sex };

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate({ _id : ObjectId(UserID) }, { $push: { Dogs: newDog}}, function(err, user)
  {
    // Check for any technical errors
    if (err)
    {
      return res.status(500).send('Technical error while attempting to update User information.');
    }
    // Update JWT and send confirmation message.
    else
    {
      return res.status(200).send('Doge Successfully Inserted!');
    }
  });
};