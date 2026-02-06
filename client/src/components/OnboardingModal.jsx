import { useState } from "react";
import axios from "axios";
import { User, Save, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const OnboardingModal = () => {
    const { updateUser } = useAuth();
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName.trim()) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
                full_name: fullName
            });
            updateUser({ full_name: response.data.full_name });
            window.location.reload();
        } catch (err) {
            console.error("Failed to update profile", err);
            setError("Failed to save. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
            <div className="relative w-full max-w-md">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl opacity-50 blur-xl pointer-events-none"></div>

                <div className="relative bg-[#0F172A] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <User size={120} className="text-white" />
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={() => window.location.reload()}
                            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div className="text-center mb-8 relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <User size={40} className="text-violet-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome, Explorer</h2>
                        <p className="text-slate-400">Identify yourself to access the command center.</p>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">What should we call you?</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#020617]/50 border border-white/10 text-white placeholder-slate-600 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all"
                                placeholder="Enter your full name"
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader size={20} className="animate-spin" />
                                    <span>Initializing...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    <span>Initialize Profile</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
