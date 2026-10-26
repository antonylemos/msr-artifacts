// Contrato de integração versionado, sem componentes ou estado global compartilhados.
export type Cleanup = () => void;
export type Mount = (host: HTMLElement) => Promise<Cleanup>;
export type Remote = { mount: Mount };
export type Manifest = { version: 1; catalogo: string; checkout: string };
