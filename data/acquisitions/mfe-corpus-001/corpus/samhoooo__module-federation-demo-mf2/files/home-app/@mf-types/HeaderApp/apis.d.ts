
    export type RemoteKeys = 'HeaderApp/Header';
    type PackageType<T> = T extends 'HeaderApp/Header' ? typeof import('HeaderApp/Header') :any;