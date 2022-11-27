// holD the get me EXECUTE THE ME QUERY SET UP USING APOLLO SERVER 
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id 
            username 
            email
            bookCount
            books {
                _id 
                authorsdescription
                title 
                image
                link

            }
        }
    }
`;


// GET_ME 