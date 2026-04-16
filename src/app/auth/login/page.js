"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import {
    MailOutlined,
    LockOutlined,
    GoogleOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    SafetyOutlined,
    RocketOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import { Alert, Spin, message } from "antd";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const tokenResult = await user.getIdTokenResult();
            const role = tokenResult.claims.role;

            if (!role) {
                message.error("No role assigned. Please contact administrator.");
                setLoading(false);
                return;
            }

            const idToken = tokenResult.token;
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            document.cookie = `firebase-token=${idToken}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict`;

            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            message.success(`Welcome back! Redirecting to dashboard...`);
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (err) {
            setError(err.message);
            message.error(err.message);
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const tokenResult = await user.getIdTokenResult();
            const role = tokenResult.claims.role;

            if (!role) {
                message.error("No role assigned. Contact admin.");
                await auth.signOut();
                setLoading(false);
                return;
            }

            const idToken = tokenResult.token;
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            document.cookie = `firebase-token=${idToken}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict`;

            message.success("Google sign-in successful!");
            router.push("/");
        } catch (err) {
            message.error(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative w-full max-w-md px-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg mb-4">
                        <RocketOutlined className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">Sign in to continue to your account</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <MailOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="admin@example.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <LockOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeInvisibleOutlined className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeOutlined className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => message.info("Please contact admin to reset password")}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            {loading ? <Spin /> : "Sign In"}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogle}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <GoogleOutlined className="text-xl" />
                            Google
                        </button>
                    </form>

                    {error && (
                        <Alert
                            message="Login Failed"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            className="mt-4"
                            onClose={() => setError("")}
                        />
                    )}
                </div>

                <div className="text-center mt-6">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <SafetyOutlined />
                        <span>Secured by Firebase Authentication</span>
                        <CheckCircleOutlined className="text-green-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}