import Router from 'next/router'
import getConfig from 'next/config'

import {uploadImage} from 'Services/aws'

const {publicRuntimeConfig} = getConfig()

function withEditForm(WrappedComponent) {
  return class extends React.Component {
    state = {
      message: '',
      error: false,
      success: false,
      loading: false
    }

    chargeData = data => {
      this.setState({
        ...data.item
      })
    }

    handleSubmit = async (e, updateMutation) => {
      e.preventDefault()
      try {
        this.setState({loading: true})
        let paramsUploadImage
        let imageUrl

        if (this.state.image && this.state.idUrlProfilePicture) {
          const paramsDeleteImage = {
            Bucket: publicRuntimeConfig.AWS_BUCKET,
            Delete: {
              Objects: [
                {
                  Key: this.state.idUrlProfilePicture
                }
              ]
            }
          }

          await deleteImage(paramsDeleteImage)
        }

        if (this.state.image) {
          paramsUploadImage = {
            Body: this.state.image,
            Bucket: publicRuntimeConfig.AWS_BUCKET,
            Key: `${new Date().getTime()}_${this.state.id}`,
            ContentType: this.state.image.type
          }

          imageUrl = `https://${
            publicRuntimeConfig.AWS_BUCKET
          }.s3.amazonaws.com/${paramsUploadImage.Key} `

          await uploadImage(paramsUploadImage)
        }

        await updateMutation({
          variables: {
            ...this.state,
            urlProfilePicture: imageUrl
              ? imageUrl
              : this.state.urlProfilePicture,
            idUrlProfilePicture: paramsUploadImage
              ? paramsUploadImage.Key
              : this.state.idUrlProfilePicture
          }
        })

        document.getElementById('form').reset()
        this.setState({
          message: 'Success updated!',
          success: true,
          loading: false
        })

        setTimeout(() => {
          Router.push(`/profile?id=${this.state.id}`)
        }, 2000)
      } catch (err) {
        this.setState({message: err.message, error: true, loading: false})
      }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleUploadFile = event =>
      this.setState({
        image: event.target.files[0]
      })

    render() {
      const formProps = {
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit,
        handleUploadFile: this.handleUploadFile,
        chargeData: this.chargeData
      }
      console.log('State:', this.state)
      return (
        <WrappedComponent
          form={formProps}
          stateForm={this.state}
          {...this.props}
        />
      )
    }
  }
}

export default withEditForm
