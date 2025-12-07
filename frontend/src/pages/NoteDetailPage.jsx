import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router"; 
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="max-w-xl mx-auto">
          
          {/* Header & Back Button */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 transition mb-8 group"
          >
            <ArrowLeftIcon className="size-5 transition group-hover:-translate-x-0.5" />
            <span className="font-medium">Back to Notes</span>
          </Link>

          {/* Card Component */}
          <div className="card bg-gray-800 border border-gray-700 shadow-2xl shadow-gray-900/50">
            <div className="card-body p-6 sm:p-8">
              
              {/* Header & Delete Button */}
              <div className="flex items-center justify-between border-b border-gray-700/50 pb-3 mb-6">
                <h2 className="text-3xl font-extrabold text-white">
                  Edit Note ✍️
                </h2>
                
                {/* Delete Button */}
                <button 
                  onClick={handleDelete} 
                  className="btn btn-error btn-sm btn-outline border-red-500/50 hover:bg-red-600/20 text-red-400 hover:text-red-300"
                  aria-label="Delete this note"
                >
                  <Trash2Icon className="h-4 w-4" />
                  Delete
                </button>
              </div>

              {/* Input Form */}
              <div className="space-y-6">
                
                {/* Title Input */}
                <div className="form-control">
                  <label className="label pt-0 pb-2">
                    <span className="label-text text-gray-300 font-medium">Title:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered w-full bg-gray-700/50 text-white 
                             border-gray-700 focus:border-blue-500 focus:ring-1 
                             focus:ring-blue-500 transition-colors duration-200"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>

                {/* Content Textarea */}
                <div className="form-control">
                  <label className="label pt-0 pb-2">
                    <span className="label-text text-gray-300 font-medium">Content:</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-44 w-full bg-gray-700/50 text-white 
                             border-gray-700 focus:border-blue-500 focus:ring-1 
                             focus:ring-blue-500 transition-colors duration-200 resize-none"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                {/* Save Button */}
                <div className="card-actions justify-end pt-4">
                  <button
                    onClick={handleSave}
                    className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 border-blue-600 
                               text-white font-bold transition-all duration-200 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;