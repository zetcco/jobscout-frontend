import React from "react";
import ProfileHeaderCard from "./ProfileHeaderCard";

export const ProfileSmallWithName = ({name, sx, avatar}) => {
    return ( <ProfileHeaderCard name={name} sx={sx} src={avatar} />);
}
 