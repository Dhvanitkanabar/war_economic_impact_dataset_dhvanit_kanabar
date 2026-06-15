import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getConflictById, replaceConflict } from '../../services/conflictService';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ReplaceConflict = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    conflictName: '',
    region: '',
    primaryCountry: '',
    status: '',
    gdpPerCapitaChange: '',
    inflationRate: '',
    warCost: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConflict = async () => {
      try {
        const data = await getConflictById(id);
        const c = data?.data || data;
        setFormData({
          conflictName: c.conflictName || c.name || c.title || '',
          region: c.region || '',
          primaryCountry: c.primaryCountry || c.country || c.location || '',
          status: c.status || '',
          gdpPerCapitaChange: c.gdpPerCapitaChange ?? c.gdpImpact ?? c.gdpChange ?? '',
          inflationRate: c.inflationRate ?? c.inflation ?? '',
          warCost: c.warCost ?? c.estimatedWarCost ?? ''
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load conflict data.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchConflict();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const payload = { ...formData };
      if (payload.gdpPerCapitaChange !== '') payload.gdpPerCapitaChange = Number(payload.gdpPerCapitaChange);
      if (payload.inflationRate !== '') payload.inflationRate = Number(payload.inflationRate);
      if (payload.warCost !== '') payload.warCost = Number(payload.warCost);

      await replaceConflict(id, payload);
      navigate('/conflicts');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to replace conflict.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-12 text-center text-ink-400">Loading conflict details...</div>;
  }

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ink-50">Replace Conflict</h1>
        <p className="text-muted mt-2 text-sm">Replace the entire document for this conflict.</p>
      </div>

      <div className="bg-card border border-border rounded p-6 shadow-card">
        {error && (
          <div className="mb-6 p-3 rounded border border-crimson-600/30 bg-crimson-600/10 text-sm text-crimson-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Conflict Name" name="conflictName" value={formData.conflictName} onChange={handleChange} required />
          <Input label="Region" name="region" value={formData.region} onChange={handleChange} required />
          <Input label="Primary Country" name="primaryCountry" value={formData.primaryCountry} onChange={handleChange} required />
          <Input label="Status (e.g. Active, Historical)" name="status" value={formData.status} onChange={handleChange} required />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="GDP Impact (%)" name="gdpPerCapitaChange" type="number" step="0.1" value={formData.gdpPerCapitaChange} onChange={handleChange} required />
            <Input label="Inflation Rate (%)" name="inflationRate" type="number" step="0.1" value={formData.inflationRate} onChange={handleChange} required />
            <Input label="War Cost ($)" name="warCost" type="number" value={formData.warCost} onChange={handleChange} required />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate('/conflicts')} disabled={isLoading}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Replacing...' : 'Replace Conflict'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplaceConflict;
