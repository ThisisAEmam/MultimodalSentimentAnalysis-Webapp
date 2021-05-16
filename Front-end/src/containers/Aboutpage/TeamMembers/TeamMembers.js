import React from "react";
import classes from "./TeamMembers.module.css";
import members from "./data";
import TeamMemberCard from "../../../components/Aboutpage/TeamMemberCard/TeamMemberCard";

const TeamMembers = (props) => {
  return (
    <div className={classes.TeamMembers}>
      {members.map((member, index) => (
        <TeamMemberCard key={index} name={member.name} image={member.image} />
      ))}
    </div>
  );
};

export default TeamMembers;
