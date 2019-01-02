import Router from 'next/router'
import getConfig from 'next/config'

import {uploadImage} from 'Services/aws'

const {publicRuntimeConfig} = getConfig()

function withForm(WrappedComponent, type) {
  return class extends React.Component {
    state = {
      message: '',
      error: false,
      success: false,
      loading: false
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
          this.setState({loading: true})
          let paramsUploadImage
          let imageUrl

          if (this.state.image) {
            paramsUploadImage = {
              Body: this.state.image,
              Bucket: publicRuntimeConfig.AWS_BUCKET,
              Key: `${new Date().getTime()}_${this.state.title}`,
              ContentType: this.state.image.type
            }

            imageUrl = `https://${
              publicRuntimeConfig.AWS_BUCKET
            }.s3.amazonaws.com/${paramsUploadImage.Key} `

            await uploadImage(paramsUploadImage)
          }

          const response = await mutation({
            variables: {
              ...this.state,
              urlImage: imageUrl ? imageUrl : this.state.urlImage,
              idUrlImage: paramsUploadImage
                ? paramsUploadImage.Key
                : this.state.idUrlImage
            }
          })

          this.setState({
            message: 'Success created!',
            success: true,
            loading: false
          })

          return setTimeout(() => {
            Router.push({
              pathname: '/item',
              query: {id: response.data.createItem.id}
            })
          }, 2000)
        }

        //main
        await mutation(this.state)
        this.setState({success: true})
        document.getElementById('form').reset()

        if (type === 'signin') {
          // Force a reload of all the current queries now that the user is
          // logged in
          return this.props.client.cache.reset().then(() => {
            Router.push('/')
          })
        }

        if (type === 'signup') {
          return setTimeout(() => {
            Router.push('/login')
          }, 2000)
        }
      } catch (err) {
        this.setState({message: err.message, error: true, loading: false})
      }
    }

    render() {
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
