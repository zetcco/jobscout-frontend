import React from "react";
import ProfileHeaderCard from "./ProfileHeaderCard";

const ProfileWithHeader = ({title , name }) => {
    return ( 
                <ProfileHeaderCard
                    title={ title }
                    name={ name }
                />
     );
}
 
export default ProfileWithHeader;