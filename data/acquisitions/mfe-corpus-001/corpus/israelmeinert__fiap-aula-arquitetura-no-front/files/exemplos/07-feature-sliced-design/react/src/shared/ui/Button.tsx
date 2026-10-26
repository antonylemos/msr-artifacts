import type { ReactNode } from 'react';
export function Button({ children, disabled, onClick }: { children: ReactNode; disabled: boolean; onClick: () => void }) { return <button disabled={disabled} onClick={onClick}>{children}</button>; }
