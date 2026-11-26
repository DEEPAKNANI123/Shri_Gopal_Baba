import React, { useState } from 'react';
import {
  UserCog, Shield, Check, Lock, Building, Key, Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAshram } from '../../context/AshramContext';

export default function UserManagementAdmin() {
  const { availableUsers, roles, currentUser, switchUser } = useAuth();
  const { ashrams } = useAshram();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <UserCog className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            User & Role Management
          </h1>
          <p className="text-xs text-stone-500">
            Demonstration accounts with role permissions and branch data isolation.
          </p>
        </div>
      </div>

      {/* 6 Preconfigured Demo Accounts as required by Section 19 */}
      <div className="space-y-4">
        <h2 className="text-base font-bold font-spiritual text-stone-900">
          Preconfigured Demonstration Administrator Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableUsers.map(user => {
            const isCurrent = currentUser.id === user.id;
            return (
              <div
                key={user.id}
                className={`p-6 rounded-3xl border transition-all space-y-4 bg-white ${
                  isCurrent ? 'border-saffron-600 shadow-spiritual ring-1 ring-saffron-600' : 'border-stone-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-900 px-2.5 py-0.5 rounded-full">
                    {user.role.replace('_', ' ')}
                  </span>
                  {isCurrent && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Active Session</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-spiritual-gold"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 font-spiritual">
                      {user.fullName}
                    </h3>
                    <p className="text-xs text-stone-500">{user.roleTitle}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Phone:</strong> {user.phone}</div>
                  <div>
                    <strong>Assigned Branch:</strong>{' '}
                    {user.assignedAshramId === 'all'
                      ? 'All Branches (Super Access)'
                      : ashrams.find(a => a.id === user.assignedAshramId)?.city}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => switchUser(user.id)}
                    disabled={isCurrent}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-stone-100 text-stone-400 cursor-default'
                        : 'bg-saffron-600 text-white hover:bg-saffron-700 shadow-xs'
                    }`}
                  >
                    {isCurrent ? 'Current Logged In User' : `Switch to ${user.fullName.split(' ')[0]}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 space-y-4">
        <h2 className="text-base font-bold font-spiritual text-stone-900">
          Module Permissions Matrix (Enforced in UI & Backend)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-100">
              <tr>
                <th className="p-3">Role Name</th>
                <th className="p-3">Overview</th>
                <th className="p-3">Ashrams</th>
                <th className="p-3">Donations</th>
                <th className="p-3">Annadanam</th>
                <th className="p-3">Inventory</th>
                <th className="p-3">Social Media</th>
                <th className="p-3">User Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-3 font-bold text-stone-900">Super Admin</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">Finance Admin</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">Operations Admin</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">Content Manager</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
                <td className="p-3 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-3 text-stone-300">✗ No Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
