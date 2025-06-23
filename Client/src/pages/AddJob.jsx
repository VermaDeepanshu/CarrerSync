import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // ✅ Important for Quill styles
import { JobLocations, JobCategories } from '../assets/assets'; // ✅ Corrected imports

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write detailed job description here...',
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = quillRef.current?.root.innerHTML;

    const jobData = {
      title,
      location,
      category,
      level,
      salary,
      description,
    };

    console.log('Job Submitted:', jobData);
    // You can now send this jobData to backend via axios/fetch etc.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='container p-4 flex flex-col w-full items-start gap-3'
    >
      {/* Job Title */}
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input
          type='text'
          placeholder='Type here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
          required
        />
      </div>

      {/* Description */}
      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div
          ref={editorRef}
          className='bg-white min-h-[180px] border border-gray-300 rounded'
        ></div>
      </div>

      {/* Dropdowns */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Level</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value='Beginner level'>Beginner level</option>
            <option value='Intermediate level'>Intermediate level</option>
            <option value='Senior level'>Senior level</option>
          </select>
        </div>
      </div>

      {/* Salary */}
      <div>
        <p className='mb-2'>Job Salary</p>
        <input
          type='number'
          placeholder='Enter salary'
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
          min={0}
          required
        />
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='w-28 py-3 mt-4 bg-black text-white rounded'
      >
        Add
      </button>
    </form>
  );
};

export default AddJob;
