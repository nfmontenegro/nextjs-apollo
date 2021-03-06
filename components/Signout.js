import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import {toast} from 'react-toastify'
import {withApollo, Mutation} from 'react-apollo'

import 'react-toastify/dist/ReactToastify.css'

import {CURRENT_USER_QUERY} from './User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

async function handleSignout(e, signout, client) {
  e.preventDefault()
  client.resetStore()
  toast.info('Bye ✋🏻', {
    onOpen: () => {
      Router.push('/home?page=1')
    },
    onClose: async () => {
      await signout()
    }
  })
}

const Signout = ({client}) => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[
      {
        query: CURRENT_USER_QUERY
      }
    ]}
  >
    {signout => (
      <a
        style={{cursor: 'pointer'}}
        onClick={e => handleSignout(e, signout, client)}
      >
        Sign Out
      </a>
    )}
  </Mutation>
)
export default withApollo(Signout)
