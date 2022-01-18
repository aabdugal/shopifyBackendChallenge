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

exports.upload = (file, itemId) => {
  const blob = file.data
  let params = {
    Bucket: bucket,
    Key: itemId,
    Body: blob,
  }
  let request = s3.upload(params)
  return request.promise()
}
