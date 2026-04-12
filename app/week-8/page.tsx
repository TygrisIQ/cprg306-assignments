"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-white">Shopping List App</h1>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-lg">
            Welcome, {user.displayName} ({user.email})
          </p>
          <Link
            href="/week-8/shopping-list"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Go to Shopping List
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition-colors flex items-center gap-2"
        >
          Sign in with GitHub
        </button>
      )}
    </main>
  );
}