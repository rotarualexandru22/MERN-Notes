import { useState } from "react"
import { Link, useNavigate } from 'react-router'; 
import { ArrowLeftIcon } from "lucide-react"
import { toast } from 'react-hot-toast';
import api from './../lib/axios';

const CreatePage = () => {

 const [title, setTitle] = useState("")
 const [content, setContent] = useState("")
 const [loading, setLoading] = useState(false)

 const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault()
  
  if(!title.trim() || !content.trim()){
    toast.error("All fields are required")
    return
    }
    setLoading(true)
    try {
        await api.post("/notes", {
             title,
             content
         })
         toast.success("Note created successfully!")
         navigate("/")
     } catch (error) {
         console.log("Error creating note", error)
         if (error.response && error.response.status === 429) {
         toast.error("Slow down! You're creating notes too fast!", {
         duration: 4000,
         icon: "☠️",
     });
     } else {
         toast.error("Failed to create note!");
     }
     } finally {
         setLoading(false)
     }
    }

 return (

  <div className="min-h-screen bg-gray-900 text-gray-100">
   <div className="container mx-auto px-4 py-10 sm:py-16">
    <div className="max-w-xl mx-auto">
          
          {/* Back Button: Enhanced style and spacing */}
     <Link 
            to={"/"} 
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 transition mb-8 group"
          >
      <ArrowLeftIcon className="size-5 transition group-hover:-translate-x-0.5" />
      <span className="font-medium">Back to Notes</span>
     </Link>

     {/* Card Component */}
     <div className="card bg-gray-800 border border-gray-700 shadow-2xl shadow-gray-900/50">
      <div className="card-body p-6 sm:p-8">
            
        {/* Card Header */}
       <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700/50 pb-3">
                Create New Note 📝
              </h2>
              
       <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title Input Group */}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
         />
        </div>

        {/* Content Textarea Group */}
        <div className="form-control">
         <label className="label pt-0 pb-2">
          <span className="label-text text-gray-300 font-medium">Content:</span>
         </label>
         <textarea 
          placeholder="Write your note here..."
          className="textarea textarea-bordered h-44 w-full bg-gray-700/50 text-white 
                             border-gray-700 focus:border-blue-500 focus:ring-1 
                             focus:ring-blue-500 transition-colors duration-200 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
         />
        </div>

        {/* Submission Button Group */}
        <div className="card-actions justify-end pt-4">
         <button 
                    type="submit" 
                    className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 border-blue-600 
                               text-white font-bold transition-all duration-200 disabled:opacity-50"
                    disabled = {loading || !title.trim() || !content.trim()}
                  >
          {loading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Creating...
                        </>
                    ) : (
                        "Create Note"
                    )}
         </button>
        </div>

       </form>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default CreatePage