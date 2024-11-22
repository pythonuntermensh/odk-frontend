import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuditTable from '../components/AuditTable';

const AuditPage = () => {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuditData = async () => {
      try {
        const response = await axios.get('http://192.168.0.107:8080/api/v1/audit/request');
        // Сортировка данных по убыванию по полю createdAt
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAuditData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditData();

    const interval = setInterval(fetchAuditData, 10000); // Обновление каждые 10 секунд

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: отказано в доступе</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Аудит</h1>
      <AuditTable data={auditData} />
    </div>
  );
};

export default AuditPage;