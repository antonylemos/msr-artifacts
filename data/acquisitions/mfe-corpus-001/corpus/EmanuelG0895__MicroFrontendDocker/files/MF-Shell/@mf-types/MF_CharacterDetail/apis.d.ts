
    export type RemoteKeys = 'MF_CharacterDetail/Vista';
    type PackageType<T> = T extends 'MF_CharacterDetail/Vista' ? typeof import('MF_CharacterDetail/Vista') :any;