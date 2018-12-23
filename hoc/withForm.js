import Router from 'next/router'

import {uploadImage} from 'Services/aws'

function withForm(WrappedComponent, type) {
  return class extends React.Component {
    state = {
      message: '',
      error: false,
      success: false
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleUploadFile = event =>
      this.setState({
        image: event.target.files[0]
      })

    handleSubmit = async (e, mutation) => {
      try {
        e.preventDefault()
        if (type === 'createItem') {
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

          await mutation({
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
        }

        await mutation(this.state)
        this.setState({success: true})
        document.getElementById('form').reset()

        if (type === 'signin') {
          // Force a reload of all the current queries now that the user is
          // logged in
          this.props.client.cache.reset().then(() => {
            Router.push('/')
          })
        }

        if (type === 'signup') {
          setTimeout(() => {
            Router.push('/login')
          }, 2000)
        }
      } catch (err) {
        this.setState({message: err.message, error: true, loading: false})
      }
    }

    render() {
      console.log('State:', this.state)
      const formProps = {
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit,
        handleUploadFile: this.handleUploadFile
      }
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

export default withForm
