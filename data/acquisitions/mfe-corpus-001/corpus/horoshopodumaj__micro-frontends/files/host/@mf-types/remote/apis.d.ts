
    export type RemoteKeys = 'remote/RemoteContent';
    type PackageType<T> = T extends 'remote/RemoteContent' ? typeof import('remote/RemoteContent') :any;