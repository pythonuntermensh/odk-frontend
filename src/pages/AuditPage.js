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
        const response = await axios.get('http://gateway-server:8010/api/v1/audit/request');
        setAuditData(response.data);
      } catch (err) {
        setError(err.message);
        setAuditData([
            {"id":1,"ipAddress":"100.75.103.0","isRestricted":true,"createdAt":"2024-11-18T06:28:42.889927"},
            {"id":2,"ipAddress":"172.24.0.1","isRestricted":false,"createdAt":"2024-11-18T06:28:47.874512"},
            {"id":3,"ipAddress":"100.75.103.0","isRestricted":true,"createdAt":"2024-11-18T06:35:09.877171"},
            {"id":4,"ipAddress":"172.25.0.1","isRestricted":false,"createdAt":"2024-11-18T06:35:17.726049"},
            {"id":5,"ipAddress":"172.25.0.1","isRestricted":false,"createdAt":"2024-11-18T06:36:18.342123"},
            {"id":6,"ipAddress":"100.75.103.0","isRestricted":true,"createdAt":"2024-11-18T06:36:27.481685"},
            {"id":7,"ipAddress":"172.25.0.1","isRestricted":false,"createdAt":"2024-11-18T06:36:30.291708"}
        ])
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

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Аудит</h1>
      <AuditTable data={auditData} />
    </div>
  );
};

export default AuditPage;