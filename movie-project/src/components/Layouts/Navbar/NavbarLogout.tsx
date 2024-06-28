"use client";

import logout from "@/actions/logout";
import { Link, MenuItem, useToast } from "@chakra-ui/react";

export default function NavbarLogout() {
  const toast = useToast();

  const onSignOut = () => {
    logout().then((data) => {
      if (data) {
        toast({
          description: data.message,
        });
      }
    });
  };

  return (
    <>
      <MenuItem onClick={onSignOut}>Đăng xuất</MenuItem>
    </>
  );
}
