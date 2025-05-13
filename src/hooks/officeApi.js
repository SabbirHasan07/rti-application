import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Memoize fetchOffices using useCallback
  const fetchOffices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/office');
      setOffices(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optional auto-fetch on load
  useEffect(() => {
    fetchOffices();
  }, [fetchOffices]);

  return { offices, loading, error, fetchOffices };
};

export default useApi;
