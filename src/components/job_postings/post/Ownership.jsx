import React from "react";
import { Stack } from "@mui/system";
import ProfileWithHeader from "../profile/ProfileWithHeader";

const Ownership = () => {
    return ( 
            <Stack spacing={2} direction={'column'}>
                <ProfileWithHeader
                    title = 'Posted by'
                    name = 'John Doe'
                />
                <ProfileWithHeader
                    title= 'Owned by'
                    name = 'Creative Software'
                />
            </Stack> 
     );
}
 
export default Ownership;