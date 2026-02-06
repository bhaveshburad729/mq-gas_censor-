import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { User, Phone, Mail, Save, Loader, Camera, Shield, Trash2, Building, Briefcase, Clock, Key, LogOut, CheckCircle, Activity, Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const Profile = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const [profile, setProfile] = useState({
        email: "",
        full_name: "",
        phone_number: "",
        organization: "Tronix365",
        job_title: "IoT Engineer"
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`);
            setProfile(prev => ({
                ...prev,
                email: response.data.email,
                full_name: response.data.full_name || "",
                phone_number: response.data.phone_number || ""
            }));
        } catch (error) {
            console.error("Error fetching profile:", error);
            setMessage({ type: "error", text: "Failed to load profile data." });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
                full_name: profile.full_name,
                phone_number: profile.phone_number
            });

            setMessage({ type: "success", text: "Profile updated successfully!" });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage({ type: "error", text: "Failed to update profile." });
        } finally {
            setSaving(false);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading || authLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin"></div>
            </div>
        </div>
    );

    const initials = profile.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : "US";

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto pb-20 space-y-8"
        >
            {/* Hero Section */}
            <motion.div variants={item} className="relative rounded-3xl overflow-hidden bg-[#0F172A] border border-white/5 shadow-2xl">
                {/* Cover Image with Gradient */}
                <div className="h-48 w-full bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 relative">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
                </div>

                <div className="px-8 pb-8 flex flex-col md:flex-row items-start md:items-end gap-6 relative -mt-12">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl bg-[#0F172A] p-2 rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-2xl">
                            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-5xl font-bold text-white shadow-inner border border-white/10">
                                {initials}
                            </div>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl text-violet-600 shadow-lg hover:bg-slate-50 transition-colors z-20">
                            <Camera size={18} />
                        </button>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 mb-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            {profile.full_name || "User"}
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                Active
                            </span>
                        </h1>
                        <p className="text-slate-400 font-medium">{profile.job_title} @ {profile.organization} • {profile.email}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button className="neo-btn flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10">
                            <Shield size={18} className="text-slate-400" />
                            <span>Security</span>
                        </button>
                        <button className="neo-btn flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20">
                            <Save size={18} />
                            <span>Save Profile</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Message Alert */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={clsx(
                        "p-4 rounded-xl flex items-center gap-3 border shadow-lg backdrop-blur-md",
                        message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    )}
                >
                    {message.type === 'success' ? <CheckCircle size={20} /> : <Shield size={20} />}
                    <span className="font-medium">{message.text}</span>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Quick Stats & Activity */}
                <motion.div variants={item} className="space-y-6">
                    {/* Stats */}
                    <div className="neo-card p-6 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                            <span className="block text-3xl font-bold text-white mb-1">12</span>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Projects</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-center">
                            <span className="block text-3xl font-bold text-white mb-1">85%</span>
                            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Success</span>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="neo-card p-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Activity size={16} className="text-violet-400" /> Recent Activity
                        </h3>
                        <div className="space-y-6 relative ml-2">
                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/5"></div>
                            {[
                                { action: "Profile Updated", time: "Just now", icon: User, color: "text-blue-400", bg: "bg-blue-500" },
                                { action: "Login detected", time: "2 hours ago", icon: Key, color: "text-emerald-400", bg: "bg-emerald-500" },
                                { action: "Dashboard viewed", time: "5 hours ago", icon: Activity, color: "text-violet-400", bg: "bg-violet-500" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 relative z-10 group">
                                    <div className={`w-4 h-4 rounded-full ${item.bg} border-4 border-[#0F172A] shadow-lg shrink-0 mt-0.5`}></div>
                                    <div>
                                        <p className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">{item.action}</p>
                                        <p className="text-xs text-slate-500">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right: Detailed Form */}
                <motion.div variants={item} className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="neo-card p-8">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                                <p className="text-sm text-slate-400">Update your account details and preferences.</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl text-slate-400">
                                <Settings size={20} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={profile.full_name}
                                    onChange={handleChange}
                                    className="neo-input"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Job Title</label>
                                <input
                                    type="text"
                                    name="job_title"
                                    value={profile.job_title}
                                    onChange={handleChange}
                                    className="neo-input"
                                    placeholder="Software Engineer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="neo-input opacity-50 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={profile.phone_number}
                                    onChange={handleChange}
                                    className="neo-input"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Organization</label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={profile.organization}
                                    onChange={handleChange}
                                    className="neo-input"
                                    placeholder="Company Name"
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all active:scale-95 disabled:opacity-70"
                            >
                                {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                                {saving ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;
