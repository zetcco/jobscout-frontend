import React from "react";
import { Stack } from "@mui/system";
import { Button} from "@mui/material";

const SubCategories = () => {
    return ( 
                <Stack direction={'column'} spacing={2}>
                    <Button variant='outlined'>Trending posts</Button>
                    <Button variant='outlined'>Recommended for you</Button>
                    <Button variant='outlined'>Saved</Button>
                </Stack>
     );
}
 
export default SubCategories;  