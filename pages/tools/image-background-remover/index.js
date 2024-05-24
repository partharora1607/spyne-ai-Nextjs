import React from "react";
import ImageBackgroundRemoval from "@/components/image-background-removal/ImageBackgroundRemoval";

function index(){
  return(
     <ImageBackgroundRemoval 
        Toolname='tools/image-background-remover'
     />
  )
}
export default index;