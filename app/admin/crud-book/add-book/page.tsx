"use client"
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

import BackButton from '@/components/BackButton';

export default function RegisterPage() {
  const [bookName, setBookName] = useState('');
  const [writeName, setWriteName] = useState('');
  const [pathBook, setPathBook] = useState('');
  const [pathWhere, setPathWhere] = useState('');
  const [page, setPage] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [selectedFileBook, setSelectedFileBook] = useState<File | null>(null);
  const [selectedFileWhere, setSelectedFileWhere] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    bookName: '',
    writeName: '',
    pathBook: '',
    pathWhere: '',
    page: '',
    content: '',
    language: '',
    category: '',
  });

  const handleFileChangeBook = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Validate file type
      if (!isValidFileType(selectedFile, ['image/jpeg', 'image/png'])) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pathBook: 'File type must be .jpg or .png',
        }));
        setPathBook('')
        return;
      }

      setSelectedFileBook(selectedFile);

      // Extract only the file name
      const fileName = selectedFile.name;

      // Display the selected file name in the input box
      setPathBook(fileName);
    } else {
      // Clear the path if no file is selected
      setPathBook('');
      setSelectedFileBook(null);
    }
  };

  const handleFileChangeWhere = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Validate file type
      if (!isValidFileType(selectedFile, ['image/jpeg', 'image/png'])) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pathWhere: 'File type must be .jpg or .png',
        }));
        setPathWhere('')
        return;
      }

      setSelectedFileWhere(selectedFile);

      // Extract only the file name
      const fileName = selectedFile.name;

      // Display the selected file name in the input box
      setPathWhere(fileName);
    } else {
      // Clear the path if no file is selected
      setPathWhere('');
      setSelectedFileWhere(null);
    }
  };

  const isValidFileType = (file: File, allowedTypes: string[]) => {
    return allowedTypes.includes(file.type);
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors: any = {};

    if (!bookName.trim()) {
      newErrors.bookName = 'Book Name is required';
      isValid = false;
    }

    if (!writeName.trim()) {
      newErrors.writeName = 'Writer Name is required';
      isValid = false;
    }

    if (!page.trim()) {
      newErrors.page = 'Page is required';
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    }

    if (!language.trim()) {
      newErrors.language = 'Language is required';
      isValid = false;
    }

    if (!category.trim()) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    if (!pathBook.trim()) {
      newErrors.pathBook = 'pathBook is required';
      isValid = false;
    }

    if (!pathWhere.trim()) {
      newErrors.pathWhere = 'pathWhere is required';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleAdd = async () => {
    try {
      if (!validateInputs() || !selectedFileBook || !selectedFileWhere) {
        return;
      }

      const requestData = {
        title: bookName,
        author: writeName,
        status: 'avaliable',
        imagePath: pathBook,
        imageMap: pathWhere,
        details: page,
        abstract: content,
        language: language,
        catagory: category,
      };

      const apiResponse = await axios.post('http://localhost:5005/addBook', requestData);
      console.log(requestData)
      console.log(apiResponse)

      alert(`Book Add successfully!`);
    } catch (error) {
      console.error('Error Add book:', error);
    }
  };

  return (
    <main>
      <div className="mb-10">
        <div className="w-full flex justify-center items-center">
          <BackButton />
        </div>
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-3 text-center">Add Book</h1>
          <label className="block mb-2">Book Name:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.bookName && 'border-red-500'
            }`}
            value={bookName}
            onChange={e => setBookName(e.target.value)}
          />
          {errors.bookName && (
            <p className="text-red-500 text-sm mb-2">{errors.bookName}</p>
          )}

          <label className="block mb-2">Writer Name:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.writeName && 'border-red-500'
            }`}
            value={writeName}
            onChange={e => setWriteName(e.target.value)}
          />
          {errors.writeName && (
            <p className="text-red-500 text-sm mb-2">{errors.writeName}</p>
          )}

          <label className="block mb-2">Path for Book Image:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.pathBook && 'border-red-500'
            }`}
            value={pathBook}
            readOnly // Make it read-only to prevent manual editing
          />
          <input type="file" onChange={handleFileChangeBook} className="mb-2" />
          {errors.pathBook && (
            <p className="text-red-500 text-sm mb-2">{errors.pathBook}</p>
          )}

          <label className="block mb-2">Path for Where Image:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.pathWhere && 'border-red-500'
            }`}
            value={pathWhere}
            readOnly // Make it read-only to prevent manual editing
          />
          <input
            type="file"
            onChange={handleFileChangeWhere}
            className="mb-2"
          />
          {errors.pathWhere && (
            <p className="text-red-500 text-sm mb-2">{errors.pathWhere}</p>
          )}

          <label className="block mb-2">Page:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.page && 'border-red-500'
            }`}
            value={page}
            onChange={e => setPage(e.target.value)}
          />
          {errors.page && (
            <p className="text-red-500 text-sm mb-2">{errors.page}</p>
          )}

          <label className="block mb-2">Content:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.content && 'border-red-500'
            }`}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mb-2">{errors.content}</p>
          )}

          <label className="block mb-2">Language:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.language && 'border-red-500'
            }`}
            value={language}
            onChange={e => setLanguage(e.target.value)}
          />
          {errors.language && (
            <p className="text-red-500 text-sm mb-2">{errors.language}</p>
          )}

          <label className="block mb-2">Category:</label>
          <input
            type="text"
            className={`bg-base-100 w-full border rounded p-2 mb-2 ${
              errors.category && 'border-red-500'
            }`}
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mb-2">{errors.category}</p>
          )}

          <button
            onClick={handleAdd}
            className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 mx-auto block mt-5 "
          >
            Add
          </button>
        </div>
      </div>
    </main>
  )
}
