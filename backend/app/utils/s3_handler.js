const aws = require('aws-sdk')

const id = process.env.AWS_ID
const secret = process.env.SECRET
const region = 'us-east-2'
const bucket = process.env.BUCKET

aws.config.update({
  accessKeyId: id,
  secretAccessKey: secret,
  region: region,
})

const s3 = new aws.S3()

exports.upload = async (file) => {
  const blob = file.data

  const params = {
    Bucket: bucket,
    // Key: file.name,
    Key: file,
    Body: blob,
  }
  const request = await s3.upload(params)
  console.log(request)
  return request
}

// exports.delete = (file_key) => {
//   let params = {
//     Bucket: bucket,
//     Key: file_key,
//   }
//   let request = s3.deleteObject(params)
//   return request.promise()
// }

// exports.findOne = (file_key) => {
//   let params = {
//     Bucket: bucket,
//     Key: file_key,
//   }
//   let request = s3.getObject(params)
//   return request.promise()
// }
