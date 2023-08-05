import React from 'react'
import { useParams } from 'react-router'

const ListDetails = () => {
    let {type, id} = useParams();
    return (
        <div>
            ListDetails of {type}{id}
        </div>
    )
}

export default ListDetails