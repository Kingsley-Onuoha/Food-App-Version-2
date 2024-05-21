
import { useSelector } from 'react-redux'
import axios from 'axios'
import { url } from '../utils/api'


const PayButton = ({items}) => {
    
    const user = useSelector((store)=>store.user)

    const handleCheckOut = ()=>{

        axios.post(`${url}/stripe/create-checkout-session`, {
            items
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
    }
  return (
    <div>
        <button className='rounded-md sm:p-2 px-3 w-28 mt-2 bg-blue-700 text-white' onClick={()=>handleCheckOut()}>Check out</button>
    </div>
  )
}

export default PayButton