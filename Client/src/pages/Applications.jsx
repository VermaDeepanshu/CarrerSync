import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets'; // ✅ Directly import jobsApplied
import moment from 'moment';
import Footer from '../components/Footertemp';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit ? (
              <>
                <label className='flex items-center gap-2 cursor-pointer' htmlFor="resumeUpload">
                  <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">Select Resume</p>
                  <input 
                    id='resumeUpload' 
                    accept='application/pdf' 
                    onChange={e => setResume(e.target.files[0])} 
                    type="file" 
                    hidden 
                  />
                  <img src={assets.profile_upload_icon} alt="Upload Icon" />
                </label>
                {resume && <p className="text-sm text-gray-500">Selected: {resume.name}</p>}
                <button 
                  onClick={() => setIsEdit(false)} 
                  className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <a 
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                  href={resume ? URL.createObjectURL(resume) : "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <button 
                  onClick={() => setIsEdit(true)} 
                  className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
                >
                  Edit
                </button>
              </div>
            )
          }
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => (
              <tr key={index}>
                <td className="py-3 px-4 flex items-center gap-2 border-b">
                  <img className="w-8 h-8 object-contain" src={job.logo} alt="Company logo" />
                  {job.company}
                </td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format('ll')}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-4 py-1.5 rounded ${
                    job.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : job.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
