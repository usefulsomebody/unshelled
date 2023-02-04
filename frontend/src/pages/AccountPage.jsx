import React from 'react';
import { useAuth } from '../contexts/userContext.jsx';
import AccountNav from '../components/AccountNav';
import EditUserWidget from '../components/EditUserWidget';

export default function AccountPage() {
  const { ready, user } = useAuth();

  if (!ready) {
    return 'Loading...';
  }
  return (
    <div>
      <AccountNav />
      <div className="text-center max-w-lg mx-auto mb-4">Logged in as {user.seller_id}</div>
      <EditUserWidget />
    </div>
  );
}
