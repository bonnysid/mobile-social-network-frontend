import React from 'react';
import { PlayerPage, ProfilePage, MainPage, Login, FriendsPage, RoomsPage, RoomPage, CreateRoomPage } from '../pages';

export enum Routes {
    MAIN = 'MAIN',
    LOGIN = 'LOGIN',
    PLAYER = 'PLAYER',
    PROFILE = 'PROFILE',
    FRIENDS = 'FRIENDS',
    ROOMS = 'ROOMS',
    ROOM = 'ROOM',
    CREATE_ROOM = 'CREATE_ROOM',
}

export interface IRoute {
    name: Routes;
    component: React.ReactElement
}

export const PublicRoutes: IRoute[] = [
    { name: Routes.LOGIN, component: <Login /> },
    { name: Routes.MAIN, component: <MainPage /> },
    { name: Routes.PLAYER, component: <PlayerPage /> },
    { name: Routes.PROFILE, component: <ProfilePage /> },
    { name: Routes.ROOM, component: <RoomPage /> },
    { name: Routes.ROOMS, component: <RoomsPage /> },
    { name: Routes.FRIENDS, component: <FriendsPage /> },
    { name: Routes.CREATE_ROOM, component: <CreateRoomPage /> },
];
