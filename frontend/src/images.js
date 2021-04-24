exports.uploadFile = async (file, name) => {

    const AWS = require('aws-sdk');
    AWS.config.region = 'us-east-1';
  
    var albumBucketName = "wo0of";
    var bucketRegion = "us-east-1";
    var IdentityPoolId = "us-east-1:0a08c10f-2ff9-4818-be28-4af04d0e440a";
  
    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });
  
    var s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      region: bucketRegion,
      params: { Bucket: albumBucketName }
    });
    
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: name,
      Body: file
    }
  });

  var promise = upload.promise();

  promise.then(
    function(data) {
      //alert("Successfully uploaded photo.");
    },
    function(err) {
      console.log(err);
      //return alert("There was an error uploading your photo: ", err.message);
    });
}