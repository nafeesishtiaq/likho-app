"use client";
import { createClient } from "@/lib/supabase/client";
import SocialAuthButton from "./social-button";
type provider = "google" | "facebook";
import Image from "next/image";
type providerType = {
  name: provider;
  label: string;
  icon: string;
  size: number;
};

const providers: providerType[] = [
  {
    name: "google",
    label: "Continue with google",
    icon: "/google.svg",
    size: 30,
  },
];
const SocialAuthButtons = () => {
  const handleOAuthLogin = async (provider: provider) => {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <div className="space-y-2">
      {providers.map((provider: providerType) => (
        <SocialAuthButton
          key={provider.name}
          action={() => handleOAuthLogin(provider.name)}
        >
          <Image
            src={provider.icon}
            width={provider.size}
            height={provider.size}
            alt={provider.name}
          />
          {provider.label}
        </SocialAuthButton>
      ))}
    </div>
  );
};

export default SocialAuthButtons;
