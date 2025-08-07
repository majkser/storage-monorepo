"use client";

import { FaUserSecret } from "react-icons/fa";
import { authContext } from "@/context/authContext";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserData() {
  const { user, loading } = useContext(authContext);

  if (loading) {
    return <span className="span text-white m-auto">Loading...</span>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-start gap-4 p-4 bg-black overflow-hidden">
      <Avatar>
        <AvatarImage src={user.photo} alt="user profile picture" />
        <AvatarFallback>
          <FaUserSecret color="black" size={25} />
        </AvatarFallback>
      </Avatar>
      <h1 className="p text-white">{user?.username}</h1>
    </div>
  );
}
