const _ = require("lodash");
const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const util = require("util");
const dotenv = require("dotenv");
const multer  = require('multer')
const upload = multer({ dest: 'uploads' })
const S3 = require('aws-sdk/clients/s3')

const unlinkFile = util.promisify(fs.unlink)

//Configuring S3
const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_BUCKET_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;

    console.log("Bucket Name ", bucketName)


    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey
    })


exports.profile = async(req,res) => {
    console.log("Save Image in S3")
    const file = req.file;
    console.log(file)
    

    const result = await this.uploadFile(file)
    console.log("AWS S3 ", result)
    await unlinkFile(file.path)
    let post = new Post();
    post.name = req.body.name;
    post.dob = req.body.dob;
    post.bio = req.body.bio;
    post.image = result.Location;
    console.log("Post ", post)

    post.save((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: err
                    })
                }
                return res.json({result})
            })
  }

  exports.uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path)
    
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
  }