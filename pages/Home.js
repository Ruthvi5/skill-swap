// Home.js
import React, { useState } from 'react';
import '../styles/Home.css';
import { Search } from 'lucide-react';
import UserCard from '../components/usercard';
import { mockUsers } from '../data/mockdata';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const allSkills = Array.from(
    new Set([
      ...mockUsers.flatMap(user => user.skillsOffered),
      ...mockUsers.flatMap(user => user.skillsWanted)
    ])
  ).sort();

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterUsers(term, selectedSkill);
  };

  const handleSkillFilter = (skill) => {
    setSelectedSkill(skill);
    filterUsers(searchTerm, skill);
  };

  const filterUsers = (term, skill) => {
    let filtered = mockUsers;

    if (term) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.title.toLowerCase().includes(term.toLowerCase()) ||
        user.skillsOffered.some(s => s.toLowerCase().includes(term.toLowerCase())) ||
        user.skillsWanted.some(s => s.toLowerCase().includes(term.toLowerCase()))
      );
    }

    if (skill) {
      filtered = filtered.filter(user =>
        user.skillsOffered.includes(skill) || user.skillsWanted.includes(skill)
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Learn. Teach. <span className="highlight">Grow.</span></h1>
          <p>Connect with skilled individuals and exchange knowledge. Teach what you know, learn what you need.</p>
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for skills, people, or expertise..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-box"><h3>500+</h3><p>Active Members</p></div>
        <div className="stat-box"><h3>150+</h3><p>Skills Available</p></div>
        <div className="stat-box"><h3>1200+</h3><p>Successful Swaps</p></div>
        <div className="stat-box"><h3>4.8</h3><p>Average Rating</p></div>
      </div>

      <div className="filter-section">
        <p>Filter by Skill:</p>
        <button onClick={() => handleSkillFilter('')} className={selectedSkill === '' ? 'active' : ''}>All Skills</button>
        {allSkills.slice(0, 10).map(skill => (
          <button
            key={skill}
            onClick={() => handleSkillFilter(skill)}
            className={selectedSkill === skill ? 'active' : ''}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="results-section">
        <h2>{filteredUsers.length === mockUsers.length ? 'All Members' : `${filteredUsers.length} Results`}</h2>
        <p>{searchTerm || selectedSkill ? `Showing results for "${searchTerm || selectedSkill}"` : 'Discover talented individuals ready to share their expertise'}</p>

        {filteredUsers.length > 0 ? (
          <div className="user-grid">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search className="search-icon" />
            <h3>No results found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
