import { IUserAdminCustom } from "@/types/response/user.type";
import { List, ListItem } from "@chakra-ui/react";

export default function UserDetail({ user }: { user: IUserAdminCustom }) {
  return (
    <List>
      <ListItem>
        Tên: {user.name} - Lv: {user.level}
      </ListItem>
      <ListItem>ProviderId: {user.provider_id}</ListItem>
    </List>
  );
}
