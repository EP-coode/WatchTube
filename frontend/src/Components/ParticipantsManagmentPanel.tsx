import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { User } from 'watch-tube-backend/common/User';
import { ClientToServerEvents } from 'watch-tube-backend/events/clientToServerEvents';
import { ServerToClientEvents } from 'watch-tube-backend/events/serverToClientEvents';
import {
  AccountCircle as AccountCircleIcon,
  Clear as ClearIcon,
  Settings as SettingIcon,
} from '@mui/icons-material';

type Props = {
  owner: User;
  participants: User[];
};

export function ParticipantsManagmentPanel({ owner, participants }: Props) {
  const ParticipantsComponents = participants.map(({ nickName, userId }) => (
    <ListItem
      key={userId}
      secondaryAction={
        <>
          <IconButton>
            <SettingIcon />
          </IconButton>
          <IconButton edge="end" aria-label="remove participant">
            <ClearIcon />
          </IconButton>
        </>
      }
    >
      <AccountCircleIcon />
      <ListItemText sx={{ ml: 1 }}>{nickName}</ListItemText>
    </ListItem>
  ));

  return (
    <Box>
      <Typography>Właściciel: {owner.nickName}</Typography>
      <Typography>Członkowie: </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {ParticipantsComponents}
      </List>
    </Box>
  );
}
