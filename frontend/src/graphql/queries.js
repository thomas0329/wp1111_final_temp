import { gql } from '@apollo/client';

export const IMAGE_QUERY = gql`
  query image($user: String){
    image(user: $user){
      id
      name
      email
      Image{
        _id
        name
        link
        img{
          url
        }
      }
    }
  }
`
export const USER_QUERY = gql`
  query user($id: ID, $name: name, $email: email){
    user(id: $id){
      id
      name
      email
  }
}

`