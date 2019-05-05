export default function withPreload(preload) {
  return (WrappedComponent) => {
    WrappedComponent.preload = preload;
    return WrappedComponent;
  };
}