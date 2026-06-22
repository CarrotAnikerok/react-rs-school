'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorProps = {
  children?: ReactNode;
  fallback: ReactNode;
};

type ErrorState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(`Error occurred ${error}. Its about ${errorInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
