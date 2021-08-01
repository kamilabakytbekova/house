import React from 'react';
import { useParams } from 'react-router';
import { useEffect , useState} from 'react';
import Api from '../../API/Api';

function Detail(props) {
   const params = useParams()
   const [data,setData]= useState(null)
   useEffect(() => {
    Api.getElementDetail(params.id)
        .then((data) => {
            console.log(data)
            setData(data)
        })
}, [params])
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

export default Detail;