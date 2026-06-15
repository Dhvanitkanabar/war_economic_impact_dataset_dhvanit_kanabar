import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createConflict } from '../../services/conflictService';
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

const CreateConflict = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
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

      await createConflict(payload);
      resetForm();
      navigate('/conflicts');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create conflict.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ink-50">Create Conflict</h1>
        <p className="text-muted mt-2 text-sm">Add a new global conflict to the database.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        {error && (
          <div className="mb-6 p-3 rounded-xl border border-crimson-600/30 bg-crimson-600/10 text-sm text-crimson-400">
            {error}
          </div>
        )}

        <Formik
          initialValues={{
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
          }}
          validationSchema={ConflictSchema}
          onSubmit={handleSubmit}
        >
          {({ handleReset }) => (
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
                  onClick={() => {
                    handleReset();
                    navigate('/conflicts');
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Creating conflict..."
                >
                  Create Conflict
                </SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateConflict;
