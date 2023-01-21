import React from "react";
import { Stack } from "@mui/system";
import { Button} from "@mui/material";

const SubCategories = () => {
    const buttonStyle = {color:'#28AF38' , backgroundColor:'#FFFFFF' , borderRadius:'20px' ,border:'2px solid #28AF38' , fontWeight:'bold'}
    return ( 
                <Stack direction={'column'} spacing={4}>
                    <Button variant='contained' style = {buttonStyle}>Trending posts</Button>
                    <Button variant='contained' style = {buttonStyle}>Recommended for you</Button>
                    <Button variant='contained' style = {buttonStyle}>Saved</Button>
                </Stack>
     );
}
 
export default SubCategories;  