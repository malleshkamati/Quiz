
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Myquiz() {
  const mail = localStorage.getItem('email');
  const [qid, set_quid] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const get_form = async () => {
      try {
        const response = await axios(`http://localhost:5000/myquiz/${mail}`);
        set_quid(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    get_form();
  }, [mail]);

  const handleEdit = (id) => {
    navigate(`/edit_quiz/${id}`);
  };

  return (
    <div className='bg-gray-200 min-h-svh  flex '>
      <div className=' w-full flex h-full p-20 justify-center '>
        <table className='table-fixed  bg-white'>
          <thead className="tr border-2 rounded-lg">
            <tr>
              <th className='col border-2 text-lg bg-blue-500 text-white text-center p-3'>Quiz code</th>
              <th className='col border-2 text-lg bg-blue-500 text-white text-center p-3'>Quiz title</th>
              <th className='col border-2 text-lg bg-blue-500 text-white text-center p-3'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {qid.map((e) => (
              <tr key={e.id}>
                <td className='text-center p-2'>{e.id}</td>
                <td className='text-center p-2'>{e.form_title}</td>
                <td className='text-center p-2'>
                  <button
                    className='bg-green-600 text-white py-1 rounded-md px-5 hover:bg-green-400'
                    onClick={() => handleEdit(e.id)}
                  >
                    Edit
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

export default Myquiz;
