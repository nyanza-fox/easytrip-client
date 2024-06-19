'use client';

import { API_URL } from '@/constants/url';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

const EditProfileForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/me`);

      if (!response.ok) {
        throw new Error('Failed to fetch the user');
      }
      // setFirstName(await response.);
    } catch (error) {
      console.error('An error occurred while fetching the user', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form className="p-5">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={user?.profile.firstName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={user?.profile.lastName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={user?.profile.phoneNumber}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Birthdate
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={user?.profile.dateOfBirth?.toISOString().split('T')[0]}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditProfileForm;
