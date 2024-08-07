import { useState } from 'react';
import { searchUsers } from '../lib/pocketbase';
import Link from 'next/link';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const results = await searchUsers(searchTerm);
      setSearchResults(results);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="flex-grow px-4 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <ul className="space-y-2">
          {searchResults.map((user) => (
            <li key={user.id} className="p-2 bg-gray-100 rounded">
              <Link href={`/profile/${user.id}`}>
                <a className="text-blue-500 hover:underline">{user.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;