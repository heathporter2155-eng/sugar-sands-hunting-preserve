"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  created_at: string;
}

export default function AdminActions({ members }: { members: Profile[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, fullName: newName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Failed to invite member.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setNewName("");
      setNewEmail("");
      setTimeout(() => {
        setShowAddForm(false);
        setStatus("idle");
        router.refresh();
      }, 2000);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleRemoveMember = async (memberId: string, memberEmail: string) => {
    if (!confirm(`Are you sure you want to remove ${memberEmail}? This cannot be undone.`)) {
      return;
    }

    setRemovingId(memberId);

    try {
      const response = await fetch("/api/admin/remove-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to remove member.");
        setRemovingId(null);
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <>
      {/* Add Member Section */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-bark-900">
          Members ({members.length})
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-base"
        >
          {showAddForm ? "Cancel" : "+ Add Member"}
        </button>
      </div>

      {showAddForm && (
        <div className="card-plantation p-6 mb-8">
          <h3 className="font-display text-lg font-semibold text-bark-900 mb-4">
            Invite New Member
          </h3>
          <p className="text-bark-500 text-sm mb-4">
            An email invitation will be sent so they can set their password and log in.
          </p>

          {status === "success" ? (
            <div className="bg-pine-50 border border-pine-200 rounded-sm p-4 text-center">
              <p className="text-pine-800 font-medium">
                ✅ Invitation sent successfully!
              </p>
            </div>
          ) : (
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="newName"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="newName"
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newEmail"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="newEmail"
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-3">
                  <p className="text-red-700 text-sm">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary disabled:opacity-50"
              >
                {status === "loading" ? "Sending Invite..." : "Send Invitation"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Member List */}
      {members.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-earth-300">
                <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                  Joined
                </th>
                <th className="text-right py-3 px-4 font-display font-semibold text-bark-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-earth-200 hover:bg-cream-100"
                >
                  <td className="py-3 px-4 text-bark-700 font-medium text-sm">
                    {member.full_name || "—"}
                  </td>
                  <td className="py-3 px-4 text-bark-600 text-sm">
                    {member.email || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === "admin"
                          ? "bg-earth-600 text-cream-50"
                          : "bg-pine-100 text-pine-800"
                      }`}
                    >
                      {member.role === "admin" ? "Admin" : "Member"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-bark-600 text-sm">
                    {new Date(member.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {member.role !== "admin" && (
                      <button
                        onClick={() =>
                          handleRemoveMember(member.id, member.email || "this member")
                        }
                        disabled={removingId === member.id}
                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                      >
                        {removingId === member.id ? "Removing..." : "Remove"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 card-plantation p-12">
          <span className="text-5xl block mb-4">👥</span>
          <h3 className="font-display text-xl font-semibold text-bark-900 mb-2">
            No Members Yet
          </h3>
          <p className="text-bark-500">
            Add your first member using the button above.
          </p>
        </div>
      )}
    </>
  );
}
