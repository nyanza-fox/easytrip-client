const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
      {children}
    </main>
  );
};

export default AuthLayout;
