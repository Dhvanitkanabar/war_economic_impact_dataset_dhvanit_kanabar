import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ink-50">Admin Panel</h1>
        <p className="text-muted mt-2">Administrator-only actions and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded p-6 shadow-card hover:bg-ink-950/40 transition-colors">
          <h2 className="text-xl font-bold text-ink-100 mb-2">Conflict Management</h2>
          <p className="text-sm text-ink-400 mb-4">View and manage the complete global conflicts database.</p>
          <Link to="/conflicts" className="text-sm font-semibold text-accent-400 hover:text-accent-300">
            Go to Conflicts &rarr;
          </Link>
        </div>

        <div className="bg-card border border-border rounded p-6 shadow-card hover:bg-ink-950/40 transition-colors">
          <h2 className="text-xl font-bold text-ink-100 mb-2">Create Conflict</h2>
          <p className="text-sm text-ink-400 mb-4">Add a new conflict record to the database.</p>
          <Link to="/admin/conflicts/create" className="text-sm font-semibold text-accent-400 hover:text-accent-300">
            Create New &rarr;
          </Link>
        </div>

        <div className="bg-card border border-border rounded p-6 shadow-card hover:bg-ink-950/40 transition-colors">
          <h2 className="text-xl font-bold text-ink-100 mb-2">Edit Conflict</h2>
          <p className="text-sm text-ink-400 mb-4">Modify existing conflict data. Access via the conflicts list.</p>
          <Link to="/conflicts" className="text-sm font-semibold text-accent-400 hover:text-accent-300">
            Find to Edit &rarr;
          </Link>
        </div>

        <div className="bg-card border border-border rounded p-6 shadow-card hover:bg-ink-950/40 transition-colors">
          <h2 className="text-xl font-bold text-ink-100 mb-2">Replace Conflict</h2>
          <p className="text-sm text-ink-400 mb-4">Completely replace a conflict document. Access via the conflicts list.</p>
          <Link to="/conflicts" className="text-sm font-semibold text-accent-400 hover:text-accent-300">
            Find to Replace &rarr;
          </Link>
        </div>

        <div className="bg-card border border-border rounded p-6 shadow-card hover:bg-ink-950/40 transition-colors">
          <h2 className="text-xl font-bold text-ink-100 mb-2">Delete Conflict</h2>
          <p className="text-sm text-ink-400 mb-4">Remove a conflict permanently. Access via the conflicts list.</p>
          <Link to="/conflicts" className="text-sm font-semibold text-crimson-400 hover:text-crimson-300">
            Find to Delete &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
