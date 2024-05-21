import React from "react";
import { ShimmerSimpleGallery } from "react-shimmer-effects"


const ShimerCircular = () => {

  return (
    <div className="sm:ml-20 sm:mr-20 sm:mt-10 mr-6 ml-6 mt-6 p-4">
       <ShimmerSimpleGallery imageType="circular" imageHeight={100} gap={20} row={1} col={4} caption />
    </div>
  )
}

export default ShimerCircular