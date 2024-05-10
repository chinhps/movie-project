"use client";

import logout from "@/actions/logout";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

export interface INavbarUserProps {
  name?: string;
  level?: number;
}

export default function NavbarUser(props: INavbarUserProps) {
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
      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />}>
          {props.name} | Lv. {props.level}
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} href="/user">
            Hồ sơ
          </MenuItem>
          <MenuItem as={Link} href="/user/change-password">
            Đổi mật khẩu
          </MenuItem>
          <MenuItem as={Link} href="/bookmarks">
            Phim của tôi
          </MenuItem>
          <MenuItem onClick={onSignOut}>Đăng xuất</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
