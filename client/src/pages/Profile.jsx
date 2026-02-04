import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { User, Phone, Mail, Save, Loader } from "lucide-react";

const Profile = () => {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState({
        email: "",
        full_name: "",
        phone_number: ""
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
            setProfile({
                email: response.data.email,
                full_name: response.data.full_name || "",
                phone_number: response.data.phone_number || ""
            });
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
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
                full_name: profile.full_name,
                phone_number: profile.phone_number
            });
            setProfile({
                ...profile,
                full_name: response.data.full_name || "",
                phone_number: response.data.phone_number || ""
            });
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage({ type: "error", text: "Failed to update profile." });
        } finally {
            setSaving(false);
        }
    };

    if (loading || authLoading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
                <div className="bg-primary/10 p-4 rounded-full">
                    <User size={32} className="text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-primary">Your Profile</h1>
                    <p className="text-secondary">Manage your account information</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border p-8">
                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2 flex items-center">
                            <Mail size={16} className="mr-2" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="input-field bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2 flex items-center">
                                <User size={16} className="mr-2" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                value={profile.full_name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2 flex items-center">
                                <Phone size={16} className="mr-2" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={profile.phone_number}
                                onChange={handleChange}
                                placeholder="+1 234 567 8900"
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary flex items-center space-x-2 px-6 py-2.5"
                        >
                            {saving ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
