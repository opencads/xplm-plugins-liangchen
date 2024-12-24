/*
Description:
    该文件主要是描述xplm中标准的接口，用于与插件进行交互。
*/

import { DateTime } from "./.tsc/System/DateTime"
import { Guid } from "./.tsc/System/Guid"

export interface IDocumentRecord {
    name: string;
    fileName: string;
    number: string;
    partNumber: string;
    remote: {
        success: boolean;
        remoteState: 'new' | 'checkedIn' | 'checkedOut' | 'unknown';
        remoteLastModifiedTime: string;
        lifeCycle: string;
        remoteAttributes: {
            key: string,
            value: string,
            type: string
        }[];
        remoteChildren: {
            fileName: string,
            name: string,
            number: string,
            partNumber: string
        }[];
        raw?: any
    },
    local: {
        success: boolean;
        workspaceState: 'untracked' | 'modified' | 'archived' | 'missing' | 'todownload';
        localFilePath: string;
        localAttributes: {
            key: string,
            value: string,
            type: string
        }[];
        localChildren: {
            fileName: string,
            name: string,
            number: string,
            partNumber: string
        }[];
        localLastModifiedTime: string;
        raw?: any
    };
}

export interface IImportInput {
    Items: {
        FilePath: string
    }[]
}

export interface ICheckInInput {
    Items: {
        FilePath: string,
        remoteRaw?: any,
        localRaw?: any,
    }[]
}

export interface ICheckInOutput {

}

export interface IUserInfomation {
    isLogin: boolean,
    name: string,
    id: string,
    email: string,
    avatar_url: string,
    html_url: string,
    token: string
}

export interface ILoginInfomation {
    username: string,
    password: string
}

export interface WebMessage {
    success: boolean;
    code: number;
    message: string;
    data: any;
}

export interface DocumentInterface {
    id: Guid,
    key: string,
    originFileName: string,
    formatFileName: string,
    lowerFormatFileName: string,
    contentMD5: string,
    rawJsonMD5: string,
    documentNumber0: string,
    documentNumber1: string,
    documentNumber2: string,
    partNumber0: string,
    partNumber1: string,
    partNumber2: string,
    documentRemoteID: string,
    partRemoteID: string,
    displayName: string,
    createTime: DateTime,
    updateTime: DateTime,
    fileLastWriteTime: DateTime,
    fileLength: number
}

export interface GetRemoteDocumentsOutput {
    Documents: IDocumentRecord[]
}

export interface QueryDocumentsByIndexInput {
    FileNames: string[],
    DocumentNumbers: string[],
    PartNumbers: string[]
}

export interface QueryDocumentsByIndexOutput {
    Documents: IDocumentRecord[]
}