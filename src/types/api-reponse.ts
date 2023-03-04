interface baseApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface loginApiResponseData {
    token: string;
    roles: loginApiResponseRoleType[];
}

interface loginApiResponseRoleType {
    id: number;
    name: string;
}

interface createSessionResponseData {
    session: {
        id: number,
        roomId: number,
        categoryId: number,
        title: string,
        assetId: string,
        serviceProvider: string,
        recordingId: string,
        createdBy: number,
        updatedAt: string,
        createdAt: string,
        sessionDuration: any,
        sessionStartTime: any,
        sessionEndTime: any
    },
    uploadUrl: string,
}

export interface loginApiResponse extends baseApiResponse<loginApiResponseData> {
    data: loginApiResponseData;
}

export interface createSessionApiResponse extends baseApiResponse<createSessionResponseData> {
    data: createSessionResponseData;
}

