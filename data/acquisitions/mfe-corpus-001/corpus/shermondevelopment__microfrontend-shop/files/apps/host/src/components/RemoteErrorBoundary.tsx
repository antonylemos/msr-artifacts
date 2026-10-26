import { Component, type ErrorInfo, type ReactNode } from 'react';

type RemoteErrorBoundaryProps = {
  children: ReactNode
  remoteName: string
}

type RemoteErrorBoundaryState = {
  hasError: boolean
}

export class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Failed to load remote: ${this.props.remoteName}`, error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="rounded-md border border-red-200 bg-red-50 p-4 text-red-900">
          <h2 className="text-sm font-semibold">Falha ao carregar {this.props.remoteName}</h2>
          <p className="mt-1 text-sm">Tente recarregar a pagina para buscar a ultima versão.</p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-3 rounded-md bg-red-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-800"
          >
            Recarregar pagina
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}