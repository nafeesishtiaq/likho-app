import React from "react";
import { Button } from "./ui/button";

interface SocialButtonProps {
  children: React.ReactNode;
  action: () => void;
}
const SocialAuthButton = ({ children, action }: SocialButtonProps) => {
  return (
    <Button onClick={action} variant="outline" className="w-full">
      {children}
    </Button>
  );
};

export default SocialAuthButton;
