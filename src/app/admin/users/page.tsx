"use client";

import { useEffect, useState } from "react";
import { User, getUsers, createUser, updateUserStatus, deleteUser, changeUserPassword } from "@/app/actions/usersActions";
import { UserPlus, Shield, ShieldAlert, Trash2, KeyRound, Check, X } from "lucide-react";
import toast from "react-hot-toast";

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // Create state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"SUPER_ADMIN" | "EDITOR">("EDITOR");

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;
    
    setIsCreating(true);
    const res = await createUser({ username: newUsername, passwordRaw: newPassword, role: newRole });
    if (res.success) {
      toast.success("Pengguna berhasil dibuat");
      setNewUsername("");
      setNewPassword("");
      fetchUsers();
    } else {
      toast.error(res.error || "Gagal membuat pengguna");
    }
    setIsCreating(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await updateUserStatus(id, !currentStatus);
    if (res.success) {
      toast.success(currentStatus ? "Pengguna dinonaktifkan" : "Pengguna diaktifkan");
      fetchUsers();
    } else {
      toast.error(res.error || "Gagal mengubah status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    const res = await deleteUser(id);
    if (res.success) {
      toast.success("Pengguna dihapus");
      fetchUsers();
    } else {
      toast.error(res.error || "Gagal menghapus pengguna");
    }
  };

  if (isLoading) return <div className="text-center py-20">Memuat data pengguna...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Manajemen Pengguna</h1>
        <p className="text-gray-400">Kelola akses staf dan admin internal.</p>
      </div>

      <div className="bg-black-light border border-black-border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5 text-gold" /> Tambah Pengguna Baru</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="bg-background border border-black-border rounded-lg px-4 py-2 focus:border-gold outline-none"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-background border border-black-border rounded-lg px-4 py-2 focus:border-gold outline-none"
            required
          />
          <select 
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as any)}
            className="bg-background border border-black-border rounded-lg px-4 py-2 focus:border-gold outline-none"
          >
            <option value="EDITOR">Editor (Hanya Artikel & Game)</option>
            <option value="SUPER_ADMIN">Super Admin (Akses Penuh)</option>
          </select>
          <button 
            type="submit" 
            disabled={isCreating}
            className="bg-gold text-black font-bold rounded-lg px-4 py-2 hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {isCreating ? "Menyimpan..." : "Buat Akun"}
          </button>
        </form>
      </div>

      <div className="bg-black-light border border-black-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black border-b border-black-border">
            <tr>
              <th className="p-4 font-semibold text-gray-300">Username</th>
              <th className="p-4 font-semibold text-gray-300">Role</th>
              <th className="p-4 font-semibold text-gray-300">Status</th>
              <th className="p-4 font-semibold text-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-black-border/50 hover:bg-black-border/30">
                <td className="p-4 font-medium">{user.username}</td>
                <td className="p-4">
                  {user.role === 'SUPER_ADMIN' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                      <ShieldAlert className="w-3.5 h-3.5" /> SUPER ADMIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                      <Shield className="w-3.5 h-3.5" /> EDITOR
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleToggleStatus(user.id, user.isActive)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                      user.isActive 
                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" 
                        : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    }`}
                  >
                    {user.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {user.isActive ? "AKTIF" : "NONAKTIF"}
                  </button>
                </td>
                <td className="p-4 flex gap-2">
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
