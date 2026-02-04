import { useRef, useEffect } from "react";
import { X, Check } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Curated icon sets suitable for the sensors
const ICON_SETS = {
    Gas: [
        "Wind", "Cloud", "CloudFog", "CloudRain", "Zap", "AlertTriangle", "AlertOctagon", "Skull",
        "Flame", "ThermometerSun", "Activity", "Radio", "Signal", "Wifi", "Server", "Cpu",
        "Database", "HardDrive", "Layers", "Box"
    ],
    Temperature: [
        "Thermometer", "ThermometerSun", "ThermometerSnowflake", "Sun", "SunMedium", "SunDim",
        "CloudSun", "Flame", "Zap", "Coffee", "Waves", "Wind", "Umbrella", "CloudLightning",
        "Droplet", "Droplets", "Snowflake", "Mountain", "Tent", "Trees"
    ],
    Humidity: [
        "Droplet", "Droplets", "CloudRain", "CloudDrizzle", "Cloud", "CloudFog", "Waves",
        "Umbrella", "GlassWater", "Bath", "Sprout", "Flower2", "Fish", "Ship", "Anchor",
        "Sailboat", "CloudLightning", "CloudSnow", "CloudHail", "CloudMoon"
    ],
    Distance: [
        "Activity", "Ruler", "Move", "Maximize2", "Minimize2", "ArrowLeftRight", "ArrowUpDown",
        "Target", "Crosshair", "Map", "MapPin", "Navigation", "Compass", "Globe", "Radar",
        "Signal", "Radio", "Wifi", "Scan", "Box"
    ]
};

const IconPickerSidebar = ({ isOpen, onClose, sensorType, currentIcon, onSelectIcon }) => {
    const sidebarRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Get the icon set for the current sensor type or fallback to a mix
    const availableIcons = ICON_SETS[sensorType] || ICON_SETS["Gas"];

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-end">
            <div
                ref={sidebarRef}
                className="w-80 bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Customize Icon</h3>
                        <p className="text-sm text-gray-500">Select an icon for {sensorType}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-900"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-4 gap-4">
                        {availableIcons.map((iconName) => {
                            const IconComponent = LucideIcons[iconName];
                            if (!IconComponent) return null;

                            const isSelected = currentIcon === iconName;

                            return (
                                <button
                                    key={iconName}
                                    onClick={() => onSelectIcon(iconName)}
                                    className={`
                                        aspect-square flex items-center justify-center rounded-xl transition-all duration-200
                                        ${isSelected
                                            ? "bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2"
                                            : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-primary hover:scale-105"
                                        }
                                    `}
                                    title={iconName}
                                >
                                    <IconComponent size={24} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <p className="text-xs text-center text-gray-400">
                        Changes are saved automatically to your profile.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IconPickerSidebar;
