
    export type RemoteKeys = 'AlertSender/AlertSender';
    type PackageType<T> = T extends 'AlertSender/AlertSender' ? typeof import('AlertSender/AlertSender') :any;