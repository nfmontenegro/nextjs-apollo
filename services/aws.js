import AWS from 'aws-sdk'
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

AWS.config.update({
  accessKeyId: publicRuntimeConfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: publicRuntimeConfig.AWS_ACCESS_KEY,
  region: 'us-east-1'
})

async function uploadImage(options) {
  console.log('Uploading image...')
  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })

  return new Promise((resolve, reject) => {
    s3.putObject(options, (err, data) => {
      if (err) {
        console.log('Error:', err)
        reject(err)
      } else {
        console.log('Image uploaded...')
        resolve(data)
      }
    })
  })
}

async function deleteImage(options) {
  console.log('Find image...')
  const s3 = new AWS.S3({signatureVersion: 'v4'})

  return new Promise((resolve, reject) => {
    s3.deleteObjects(options, (err, data) => {
      if (err) reject(err)

      console.log('Image deleted...')
      resolve(data)
    })
  })
}

export {uploadImage, deleteImage}
