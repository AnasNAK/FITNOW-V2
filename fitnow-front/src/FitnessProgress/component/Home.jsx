import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchProgress, deleteProgress, updateProgressStatus } from '../../Api';
import { isAuthenticated } from '../../auth';
import Cookies from 'js-cookie';
import Popup from "./Popup/AddPopup";
import Edit from "./Popup/EditPopup";
import Header from "./nav/Header";
import { useDisclosure } from '@chakra-ui/react';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState([]);
  const [editingProgress, setEditingProgress] = useState(null);

  const token = Cookies.get('authToken');
  const username = Cookies.get('name');

  const fetchUserProgress = async () => {
    try {
      if (!isAuthenticated()) {
        navigate('/');
        return;
      }

      if (!token) {
        console.error('Token is missing.');
        return;
      }

      const progress = await fetchProgress(token);
      setUserProgress(progress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, [navigate, token]);

  const handleInsertSuccess = () => {
    fetchUserProgress();
  };

  const handleEditProgress = (progressData) => {
    setEditingProgress(progressData);
    console.log('we are here 1 ');
    onOpen();
    console.log('we are here 2');
  };

  // const handleDeleteConfirmation = (id) => {
  //   Swal.fire({
  //     title: 'Êtes-vous sûr?',
  //     text: "Vous ne pourrez pas récupérer cet élément!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, supprimer!',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleDelete(id);
  //     }
  //   });
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteProgress(id, token);
  //     const newProgress = userProgress.filter((item) => item.id !== id);
  //     setUserProgress(newProgress);
  //     Swal.fire({
  //       icon: 'info',
  //       title: 'Success',
  //       text: 'Your progress has been deleted.',
  //     });
  //   } catch (error) {
  //     console.error('Erreur:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Erreur',
  //       text: 'Une erreur s\'est produite lors de la suppression. Veuillez réessayer.',
  //     });
  //   }
  // };

  const updateStatus = async (id) => {
    try {
      await updateProgressStatus(id, token);
      fetchUserProgress();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your progress has been marked as completed.',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <h3 className="my-3 text-3xl text-right mr-4 font-semibold ms-36">
          Hello <span className='text-yellow-600 font-mono'>{username}</span>
        </h3>
        <div className=" ms-10">
          <Popup onInsertSuccess={handleInsertSuccess} />
        </div>

        <Edit progressData={editingProgress} onUpdateSuccess={fetchUserProgress} onClose={onClose} />
        <div className="flex flex-col max-w-3xl mx-auto overflow-x-auto">
          <div className="inline-block min-w-full py-2 mx-4 overflow-hidden md:mx-0 sm:px-6 lg:px-8">
            <table className="min-w-full text-sm font-light text-left">
              <thead className="font-medium border-b border-yellow-600">
                <tr className="bg-gray-300">
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    #{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    weight{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    measurements{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    performance{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    Status{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    Action{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {userProgress.map((user, i) => (
                  <tr className="border-b dark:border-neutral-500" key={i}>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Chest: {user.measurements && user.measurements.chest}, waist: {user.measurements && user.measurements.waist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      bench_press: {user.performance_data && user.performance_data.bench_press},squats: {user.performance_data && user.performance_data.squats}
                    </td>
                    <td className="px-10 py-4 whitespace-nowrap">
                      <button
                        className="font-semibold"
                        style={{
                          color: user.status === 1 ? 'green' : 'red',
                        }}
                        disabled={user.status === 1}
                        onClick={() => updateStatus(user.id)}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td>
                      <button
                        className="font-medium text-blue-600 me-3"
                        onClick={() => handleEditProgress(user)}
                      >
                        Edit
                      </button>

                      {/* <button
                        className="font-medium text-red-700"
                        onClick={() => handleDeleteConfirmation(user.id)}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
