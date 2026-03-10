import React, { useState } from "react";
import {
  User,
  Building,
  Mail,
  Camera,
  Save,
  Moon,
  Sun,
  Monitor,
  Pencil,
  Lock,
  Bell,
  Shield
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import Profile from "../assets/Larch_logo.jpeg";
import noImg from "../assets/No_Image.jpg";

export default function ProfileSettings() {

  const { settings, updateSettings } = useSettings();

  const [editField, setEditField] = useState(false);

  const [profile, setProfile] = useState({
    name: "Supervisor",
    email: "supervisor@factory.com",
    company: "Larch Technologies",
    avatar: "",
    logo: ""
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    system: true
  });

  const activityLog = [
    "Logged in from Chrome - Today",
    "Changed password - Yesterday",
    "Updated company info - 2 days ago"
  ];

  /* PROFILE INPUT CHANGE */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, logo: url }));
    }
  };

  const saveProfile = () => {
    alert("Profile updated successfully");
    setEditField(false);
  };

  const changeTheme = (theme) => {
    updateSettings({ theme });
  };

  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  /* EDITABLE INPUT COMPONENT */

const EditableInput = ({ label, name, value, icon }) => {

  const Icon = icon;

  const handleBlur = (e) => {
    setProfile((prev) => ({
      ...prev,
      [name]: e.target.value
    }));
  };

  return (
    <div>

      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-gray-50 dark:bg-gray-800">

        <Icon size={16} className="mr-2 text-gray-400"/>

        <input
          type="text"
          name={name}
          defaultValue={value}
          disabled={!editField}
          onBlur={handleBlur}
          className="bg-transparent outline-none w-full text-gray-900 dark:text-white disabled:text-gray-400"
        />

      </div>

    </div>
  );
};

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Profile Settings
      </h1>

      {/* PROFILE CARD */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">

        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-6">

            <div className="relative">

              <img
                src={profile.avatar || Profile}
                onError={(e) => (e.target.src = Profile)}
                className="w-20 h-20 rounded-full object-cover border"
              />

              <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-1 rounded-full cursor-pointer">
                <Camera size={14} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>

            </div>

            <div>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {profile.name}
              </h2>

              <p className="text-sm text-gray-500">
                Manage your account information
              </p>

            </div>

          </div>

          {/* EDIT BUTTON */}

          <button
            onClick={() => setEditField(!editField)}
            className="flex items-center gap-2 text-sm px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Pencil size={16} />
            {editField ? "Cancel" : "Edit"}
          </button>

        </div>

        {/* COMPANY LOGO */}

        <div className="mb-6">

          <label className="text-sm font-medium">Company Logo</label>

          <div className="flex items-center gap-4 mt-2">

            <img
              src={profile.logo || noImg}
              onError={(e) => (e.target.src = noImg)}
              className="w-16 h-16 rounded border object-cover"
            />

            <input
              type="file"
              disabled={!editField}
              onChange={handleLogoUpload}
            />

          </div>

        </div>

        {/* FORM */}

        <div className="grid md:grid-cols-2 gap-5">

          <EditableInput
            label="Name"
            name="name"
            value={profile.name}
            icon={User}
          />

          <EditableInput
            label="Email"
            name="email"
            value={profile.email}
            icon={Mail}
          />

          <EditableInput
            label="Company Name"
            name="company"
            value={profile.company}
            icon={Building}
          />

        </div>

      </div>

      {/* THEME SETTINGS */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">

        <h2 className="text-lg font-semibold mb-4">
          Theme Preference
        </h2>

        <div className="flex gap-3">

          <button
            onClick={() => changeTheme("light")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              settings.theme === "light"
                ? "border-primary-600 bg-primary-50 dark:bg-primary-900/40 dark:border-primary-400"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <Sun size={16}/> Light
          </button>

          <button
            onClick={() => changeTheme("dark")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              settings.theme === "dark"
                ? "border-primary-600 bg-primary-50 dark:bg-primary-900/40 dark:border-primary-400"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <Moon size={16}/> Dark
          </button>

          <button
            onClick={() => changeTheme("system")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              settings.theme === "system"
                ? "border-primary-600 bg-primary-50 dark:bg-primary-900/40 dark:border-primary-400"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <Monitor size={16}/> System
          </button>

        </div>

      </div>

      {/* PASSWORD CHANGE */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">

        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock size={18}/> Change Password
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input type="password" placeholder="Current Password" name="current" onChange={handlePasswordChange} className="border rounded-lg px-3 py-2"/>
          <input type="password" placeholder="New Password" name="new" onChange={handlePasswordChange} className="border rounded-lg px-3 py-2"/>
          <input type="password" placeholder="Confirm Password" name="confirm" onChange={handlePasswordChange} className="border rounded-lg px-3 py-2"/>

        </div>

      </div>

      {/* ACCOUNT SECURITY */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">

        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield size={18}/> Account Security
        </h2>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span>Two Factor Authentication</span>
            <button className="text-primary-600">Enable</button>
          </div>

          <div className="flex justify-between">
            <span>Login Alerts</span>
            <button className="text-primary-600">Enable</button>
          </div>

        </div>

      </div>

      {/* NOTIFICATIONS */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">

        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={18}/> Notification Settings
        </h2>

        <div className="space-y-3">

          {Object.keys(notifications).map((type) => (
            <div key={type} className="flex justify-between">
              <span className="capitalize">{type} notifications</span>
              <input type="checkbox" checked={notifications[type]} onChange={() => toggleNotification(type)}/>
            </div>
          ))}

        </div>

      </div>

      {/* ACTIVITY LOG */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">

        <h2 className="text-lg font-semibold mb-4">
          Activity Log
        </h2>

        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">

          {activityLog.map((log, i) => (
            <li key={i} className="border-b pb-2">
              {log}
            </li>
          ))}

        </ul>

      </div>

      {/* SAVE BUTTON */}

      <div className="flex justify-end">

        <button
          onClick={saveProfile}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          <Save size={16}/> Save Changes
        </button>

      </div>

    </div>
  );
}