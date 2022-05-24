export interface IUser {
    id: number;
    username: string;
    photo: string;
}

export interface IMusic {
    id: number;
    url: string;
    title: string;
    artist: string;
    avatar: string;
}

export enum MessageType {
    CONNECTION = 'connection',
    MESSAGE = 'message',
    INVITE_USER = 'invite-user',
    REMOVE_USER = 'remove-user',
}

export interface IMessage extends IMessageCreateData{
    id: number;
    createdAt: number;
}

export interface IMessageCreateData {
    event: MessageType;
    message: string;
    userId: number;
    roomId: number;
}

export interface IRoom extends IRoomWithoutId {
    id: number;
    ownerId: number;
}

export interface IRoomWithoutId {
    title: string;
    avatar: string;
    userIds: number[];
}

export interface IAnotherUser extends IUser {
    isFriend: boolean;
    isFriendRequested: boolean;
    isWandToAddYou: boolean;
}
