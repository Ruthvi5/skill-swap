import React, { useState } from 'react';
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Users, X, Plus } from 'lucide-react';
// At the top
import axios from 'axios';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    about: '',
    availability: []
  });
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const availabilityOptions = ['weekdays', 'weekends', 'evenings', 'flexible'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option]
    }));
  };

  const addSkill = (type) => {
    const skill = type === 'offered' ? newSkillOffered : newSkillWanted;
    if (!skill.trim()) return;

    if (type === 'offered') {
      if (!skillsOffered.includes(skill)) setSkillsOffered([...skillsOffered, skill]);
      setNewSkillOffered('');
    } else {
      if (!skillsWanted.includes(skill)) setSkillsWanted([...skillsWanted, skill]);
      setNewSkillWanted('');
    }
  };

  const removeSkill = (skill, type) => {
    if (type === 'offered') setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    else setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  if (skillsOffered.length === 0) {
    setError('Please add at least one skill you can offer');
    return;
  }
  if (skillsWanted.length === 0) {
    setError('Please add at least one skill you want to learn');
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.post('http://localhost:8000/api/register', {
      ...formData,
      skills_offered: skillsOffered,
      skills_wanted: skillsWanted
    });

    if (response.status === 201 || response.status === 200) {
      navigate('/'); // redirect to homepage or login
    } else {
      setError('Registration failed. Please try again.');
    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.detail || 'Registration failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <Link to="/" className="logo-link">
            <Users className="logo-icon" />
            <span className="logo-text">Skill Swap</span>
          </Link>
          <h2>Create your account</h2>
          <p>Join our community and start sharing your skills</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-box">{error}</div>}

          {/* Add input fields: email, password, location, etc. */}
          {/* You can continue mapping them from your original template */}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="form-footer">
          <p>Already have an account? <Link to="/login" className="link">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
