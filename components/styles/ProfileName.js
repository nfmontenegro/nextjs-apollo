import styled from 'styled-components'

const ProfileName = styled.div`
  font-size: ${props => props.size || '60px'}
  color: #0a3c3b;
  font-weight: bold;
  line-height: 1.1em;
  text-align: ${props => props.align || 'none'}
  margin-top: ${props => props.marginTop || '0px'}
`

export default ProfileName
