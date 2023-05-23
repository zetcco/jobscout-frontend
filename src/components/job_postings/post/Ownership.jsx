import React from "react";
import { Stack } from "@mui/system";
import ProfileWithHeader from "../../profile/ProfileWithHeader";
import { RouterLink } from "../../RouterLink";

export const Ownership = ({createdBy , ownedBy}) => {
    return ( 
            <Stack spacing={2} direction={'column'}>
                <RouterLink to={"/users/1"}><ProfileWithHeader title = 'Posted by' name = {createdBy} /></RouterLink>
                {ownedBy && <RouterLink to={"/organizations/1"}><ProfileWithHeader title = 'Owned By' name = {ownedBy} /></RouterLink>}
            </Stack> 
     );
};