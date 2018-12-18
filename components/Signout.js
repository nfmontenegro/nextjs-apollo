import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import {Mutation} from 'react-apollo'
import {toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {CURRENT_USER_QUERY} from './User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

async function handleSignout(e, signout) {
  e.preventDefault()
  toast.info('Bye ✋🏻', {
    onOpen: () => Router.push('/'),
    onClose: async () => await signout()
  })
}

const Signout = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{query: CURRENT_USER_QUERY}]}
  >
    {signout => (
      <>
        <a style={{cursor: 'pointer'}} onClick={e => handleSignout(e, signout)}>
          Sign Out
        </a>
      </>
    )}
  </Mutation>
)
export default Signout
