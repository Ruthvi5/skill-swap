// MyProfile.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Camera, Edit, MapPin, User, Gift, Search, Calendar,
  Shield, BarChart3, History, Plus, X, Save, RotateCcw, Clock,
  Star, GraduationCap, Handshake, Check, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/authcontext';
import '../styles/myprofile.css';

function MyProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: user?.name || 'Sarah Johnson',
    location: 'New York, NY',
    about: 'Passionate UI/UX designer...',
    skillsOffered: ['UI/UX Design', 'Graphic Design'],
    skillsWanted: ['React Development', 'JavaScript'],
    availability: { weekdays: true, weekends: true, evenings: false, flexible: false },
    privacy: { profilePublic: true, showLocation: true, showEmail: false },
    image: user?.image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  });

  const [originalProfile, setOriginalProfile] = useState({ ...profile });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  const markAsChanged = () => setHasUnsavedChanges(true);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setProfile((prev) => ({ ...prev, image: result }));
        markAsChanged();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    markAsChanged();
  };

  const handleAvailabilityChange = (field) => {
    setProfile((prev) => ({
      ...prev,
      availability: { ...prev.availability, [field]: !prev.availability[field] },
    }));
    markAsChanged();
  };

  const handlePrivacyChange = (field) => {
    setProfile((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: !prev.privacy[field] },
    }));
    markAsChanged();
  };

  const addSkill = (type) => {
    const skill = type === 'offered' ? newSkillOffered : newSkillWanted;
    if (!skill.trim()) return;
    const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    const current = profile[field];
    if (!current.includes(skill)) {
      setProfile((prev) => ({ ...prev, [field]: [...current, skill] }));
      markAsChanged();
    }
    type === 'offered' ? setNewSkillOffered('') : setNewSkillWanted('');
  };

  const removeSkill = (skill, type) => {
    const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    setProfile((prev) => ({ ...prev, [field]: prev[field].filter((s) => s !== skill) }));
    markAsChanged();
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOriginalProfile({ ...profile });
      setHasUnsavedChanges(false);
      setNotification({ message: 'Profile saved!', type: 'success' });
    } catch {
      setNotification({ message: 'Save failed.', type: 'error' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const discardChanges = () => {
    setProfile({ ...originalProfile });
    setHasUnsavedChanges(false);
    setIsEditingName(false);
    setNotification({ message: 'Changes discarded.', type: 'info' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="profile-page">
      {/* Notification UI and profile sections... (abbreviated for brevity) */}
      {/* You can now move styles to a MyProfile.css file and connect it */}
    </div>
  );
}

export default MyProfile;
