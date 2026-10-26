
    export type RemoteKeys = 'AlertDashboard/AlertDashboard';
    type PackageType<T> = T extends 'AlertDashboard/AlertDashboard' ? typeof import('AlertDashboard/AlertDashboard') :any;