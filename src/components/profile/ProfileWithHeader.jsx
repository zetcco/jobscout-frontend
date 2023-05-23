import React from "react";
import ProfileHeaderCard from "./ProfileHeaderCard";

const ProfileWithHeader = ({title , name, src }) => {
    return ( 
        <ProfileHeaderCard title={ title } name={ name } src={ src }/>
     );
}
 
export default ProfileWithHeader;