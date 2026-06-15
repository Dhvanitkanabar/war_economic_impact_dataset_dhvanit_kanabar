import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getConflictById, replaceConflict } from '../../services/conflictService';
import FormInput from '../../components/forms/FormInput';
import FormNumberInput from '../../components/forms/FormNumberInput';
import FormSelect from '../../components/forms/FormSelect';
import SubmitButton from '../../components/forms/SubmitButton';
import Button from '../../components/Button';

const ConflictSchema = Yup.object().shape({
  conflictName: Yup.string()
    .required('This field is required'),
  conflictType: Yup.string()
    .required('This field is required'),
  region: Yup.string()
    .required('This field is required'),
  primaryCountry: Yup.string()
    .required('This field is required'),
  startYear: Yup.number()
    .typeError('Value must be a valid number')
    .min(0, 'Value must be greater than zero')
    .required('This field is required'),
  endYear: Yup.number()
    .typeError('Value must be a valid number')
    .min(Yup.ref('startYear'), 'End Year must be greater than or equal to Start Year')
    .required('This field is required'),
  inflationRate: Yup.number()
    .typeError('Value must be a valid number')
    .min(0, 'Value must be greater than zero')
    .required('This field is required'),
  gdpChange: Yup.number()
    .typeError('Value must be a valid number')
    .required('This field is required'),
  warCostUsd: Yup.number()
    .typeError('Value must be a valid number')
    .min(0, 'Value must be greater than zero')
    .required('This field is required'),
  reconstructionCostUsd: Yup.number()
    .typeError('Value must be a valid number')
    .min(0, 'Value must be greater than zero')
    .required('This field is required'),
  status: Yup.string()
    .required('This field is required'),
});

const ReplaceConflict = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    conflictName: '',
    conflictType: '',
    region: '',
    primaryCountry: '',
    startYear: '',
    endYear: '',
    status: '',
    gdpChange: '',
    inflationRate: '',
    warCostUsd: '',
    reconstructionCostUsd: '',
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
        setInitialValues({
          conflictName: c.conflictName || c.name || c.title || '',
          conflictType: c.conflictType || '',
          region: c.region || '',
          primaryCountry: c.primaryCountry || c.country || c.location || '',
          startYear: c.startYear ?? '',
          endYear: c.endYear ?? '',
          status: c.status || '',
          gdpChange: c.gdpChange ?? c.gdpPerCapitaChange ?? c.gdpImpact ?? '',
          inflationRate: c.inflationRate ?? c.inflation ?? '',
          warCostUsd: c.warCostUsd ?? c.warCost ?? c.estimatedWarCost ?? '',
          reconstructionCostUsd: c.reconstructionCostUsd ?? c.reconstructionCost ?? '',
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load conflict data.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchConflict();
  }, [id]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        ...values,
        startYear: Number(values.startYear),
        endYear: Number(values.endYear),
        gdpChange: Number(values.gdpChange),
        inflationRate: Number(values.inflationRate),
        warCostUsd: Number(values.warCostUsd),
        reconstructionCostUsd: Number(values.reconstructionCostUsd),
      };

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

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        {error && (
          <div className="mb-6 p-3 rounded-xl border border-crimson-600/30 bg-crimson-600/10 text-sm text-crimson-400">
            {error}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={ConflictSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Conflict Name"
                  name="conflictName"
                  placeholder="e.g. World War II"
                  required
                />
                <FormSelect
                  label="Conflict Type"
                  name="conflictType"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="World War">World War</option>
                  <option value="Civil War">Civil War</option>
                  <option value="Interstate War">Interstate War</option>
                  <option value="Asymmetric War">Asymmetric War</option>
                  <option value="Interstate/Counter-insurgency">Interstate/Counter-insurgency</option>
                </FormSelect>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Region"
                  name="region"
                  placeholder="e.g. East Asia"
                  required
                />
                <FormInput
                  label="Primary Country"
                  name="primaryCountry"
                  placeholder="e.g. South Korea"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormNumberInput
                  label="Start Year"
                  name="startYear"
                  placeholder="e.g. 1950"
                  required
                />
                <FormNumberInput
                  label="End Year"
                  name="endYear"
                  placeholder="e.g. 1953"
                  required
                />
                <FormSelect
                  label="Status"
                  name="status"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Resolved">Resolved</option>
                </FormSelect>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormNumberInput
                  label="GDP Change (%)"
                  name="gdpChange"
                  placeholder="e.g. -8.4"
                  step="0.01"
                  required
                />
                <FormNumberInput
                  label="Inflation Rate (%)"
                  name="inflationRate"
                  placeholder="e.g. 30.5"
                  step="0.01"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormNumberInput
                  label="War Cost ($)"
                  name="warCostUsd"
                  placeholder="e.g. 34000000000"
                  required
                />
                <FormNumberInput
                  label="Reconstruction Cost ($)"
                  name="reconstructionCostUsd"
                  placeholder="e.g. 60000000000"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/conflicts')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Replacing..."
                >
                  Replace Conflict
                </SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReplaceConflict;
