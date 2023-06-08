import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({
  isSignedIn,
  children,
}: {
  isSignedIn: boolean;
  children: ReactNode;
}) {
  if (!isSignedIn) {
    return (
      <>
        <Navigate to="/login" replace />;
      </>
    );
  }
  return <>{children}</>;
}
export default Protected;
