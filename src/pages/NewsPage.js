// src/pages/NewsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsTable from '../components/NewsTable';
import AddNewsModal from '../components/modals/AddNewsModal';

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('http://localhost:8010/api/v1/company/news');
        setNewsData(response.data.content);
      } catch (err) {
        setError(err.message);
        setNewsData([
          {id: 1, title: "Title 1", description: "Description 1", pictureUrl: "Url 1"},
          {id: 2, title: "Title 2", description: "Description 2", pictureUrl: "Url 2"},
        ])
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  const handleAddNews = (newNews) => {
    setNewsData((prevNewsData) => [...prevNewsData, newNews]);
  };

  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`http://localhost:8010/api/v1/company/news/${id}`);
      setNewsData((prevNewsData) => prevNewsData.filter((news) => news.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении новости:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  // if (error) {
  //   return <div>Ошибка: {error}</div>;
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Новости</h1>
      <button
        onClick={openModal}
        className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Добавить новость
      </button>
      <AddNewsModal isOpen={isModalOpen} onClose={closeModal} onAddNews={handleAddNews} />
      <NewsTable data={newsData} onDeleteNews={handleDeleteNews} />
    </div>
  );
};

export default NewsPage;