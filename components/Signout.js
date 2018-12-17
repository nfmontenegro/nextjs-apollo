import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import {Mutation} from 'react-apollo'

import {CURRENT_USER_QUERY} from './User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

async function handleSignout(signout) {
  const test = await signout()
  console.log('Test:', test)
  Router.push('/')
}

const Signout = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{query: CURRENT_USER_QUERY}]}
  >
    {signout => (
      <a style={{cursor: 'pointer'}} onClick={() => handleSignout(signout)}>
        Sign Out
      </a>
    )}
  </Mutation>
)
export default Signout
