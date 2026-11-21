import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallbackMessage: string;
};

type State = {
  hasError: boolean;
};

/**
 * Isola falhas de renderização do hCaptcha.
 *
 * Impede que uma exceção do widget comprometa
 * o restante da aplicação React.
 */
export class CaptchaErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("Falha no componente hCaptcha:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <p role="alert" className="text-sm text-amber-600 dark:text-amber-400">
          {this.props.fallbackMessage}
        </p>
      );
    }

    return this.props.children;
  }
}
