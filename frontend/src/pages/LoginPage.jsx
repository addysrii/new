import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-[1000px] h-[650px] bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/80 rounded-tr-full blur-sm"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/80 rounded-bl-full blur-sm"></div>

        <div className="flex h-full">
          {/* Left side - Login form */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              {/* Logo and Header */}
              <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className="size-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold mt-2 text-gray-800">Welcome Back</h1>
                  <p className="text-gray-600">Sign in to your account</p>
                </div>
              </div>

              {/* Social Login Options */}
              <div className="mb-8">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c2.17 0 4.1.72 5.63 1.92l4.13-4.13C19.48.71 16 -1 12 -1 7.39 -1 3.4 1.94 1.32 6.16l4.74 3.69C7.11 6.73 9.38 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96L.33 17.3C2.4 21.44 6.85 24 12 24z"
                      />
                      <path
                        fill="#34A853"
                        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.69H.33C-.12 8.37-.34 10.15-.34 12s.22 3.63.67 5.31l4.94-3.02z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Apple')}
                    className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24">
                      <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.38 4.38 0 0 0-2.91 1.5 4.1 4.1 0 0 0-1.03 2.96 3.63 3.63 0 0 0 2.88-1.77zm2.52 2.14A4.74 4.74 0 0 1 19.5 10c0 2.49-1.4 3.89-2.8 3.89-1.4 0-2.8-1.4-2.8-3.89a4.74 4.74 0 0 1 2.02-2.67A4.74 4.74 0 0 0 12 10.5c0 2.49 1.4 3.89 2.8 3.89 1.4 0 2.8-1.4 2.8-3.89 0-1.14-.29-2.17-.79-2.97a4.74 4.74 0 0 1 .65-.2z"/>
                    </svg>
                  </button>
                </div>
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="size-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white transition-colors"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="size-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white transition-colors"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-gray-400" />
                      ) : (
                        <Eye className="size-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      id="remember"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full font-semibold h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Image or Pattern */}
          <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex items-center justify-center">
            <div className="max-w-sm text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="text-blue-100 mb-6">
                Enter your personal details and start your journey with us
              </p>
              <Link
                to="/signup"
                className="inline-block px-6 py-2 border-2 border-white rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;