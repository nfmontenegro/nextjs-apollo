import React from 'react'
import {Button, Header, Icon, Modal} from 'semantic-ui-react'

class DeleteButton extends React.Component {
  state = {
    modalOpen: false,
    loading: false
  }

  handleOpen = () => this.setState({modalOpen: true})

  handleClose = () => this.setState({modalOpen: false})

  modalContent = loading => (
    <>
      {!loading ? (
        <p>Are you sure you want delete this item {this.props.item.title}?</p>
      ) : (
        <p>Just one second. We are fetching that content for you.</p>
      )}
    </>
  )

  deleteItem = async event => {
    event.preventDefault()
    this.setState({loading: true})
    await this.props.mutation({
      variables: {
        id: this.props.item.id
      }
    })
    this.handleClose()
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Delete</Button>}
        basic
        size="small"
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="trash" content="Delete" />
        <Modal.Content>{this.modalContent(this.state.loading)}</Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={this.handleClose}
            disabled={this.state.loading}
          >
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={e => this.deleteItem(e)}
            loading={this.state.loading}
            disabled={this.state.loading}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default DeleteButton
