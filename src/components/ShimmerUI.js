import { ShimmerSimpleGallery } from "react-shimmer-effects";




const Shimmer =()=>{
  
    return(
        <div className=" sm:ml-20 sm:mr-20 mr-6 ml-6 mt-6 p-4">
            <ShimmerSimpleGallery card imageHeight={200} imageWidth={20} col={4} caption />
        </div>
    )
}    
    export default Shimmer