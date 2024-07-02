import React from "react";
import { Outlet } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return <Outlet />;
    }
  }
}

export default ErrorBoundary;
