import React from "react";
import ProfileHeaderCard from "./ProfileHeaderCard";

export const ProfileSmallWithName = ({name, sx, avatar, dpSize}) => {
    return ( <ProfileHeaderCard name={name} sx={sx} src={avatar} dpSize={dpSize} />);
}
 