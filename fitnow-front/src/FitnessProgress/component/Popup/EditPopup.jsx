import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { UpdateProgress } from "../../../Api";
import Cookies from "js-cookie";

function EditPopup({progressData,onUpdateSuccess  }) {
    const [formData, setFormData] = useState(null);
    
   
    useEffect(() => {
        if (progressData) {
            setFormData(progressData);
            console.log('we are here 3');
        }
    }, [progressData]);

    const UpdateProgressHandler = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("authToken");
            if (!token) {
                throw new Error("No token found");
            }

            if (!formData) {
                throw new Error("Form data is not initialized");
            }

            const measurementsJSON = JSON.stringify(formData.measurements);
            const performanceDataJSON = JSON.stringify(formData.performance_data);

            const formDataWithJSON = {
                ...formData,
                measurements: measurementsJSON,
                performance_data: performanceDataJSON,
            };

            await UpdateProgress(formDataWithJSON, token);

            if (onUpdateSuccess) {
                onUpdateSuccess();
            }

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Your progress has been successfully updated.",
            });
        } catch (error) {
            console.error("Error updating progress:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "An unexpected error occurred.",
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (!formData) return;

        if (name === "chest" || name === "waist") {
            setFormData((prevState) => ({
                ...prevState,
                measurements: {
                    ...prevState.measurements,
                    [name]: value,
                },
            }));
        } else if (name === "bench_press" || name === "squats") {
            setFormData((prevState) => ({
                ...prevState,
                performance_data: {
                    ...prevState.performance_data,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!formData) return null ;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="bg-black text-white p-9">
                <ModalHeader className="font-bold text-2xl">Edit Progress</ModalHeader>
                <ModalCloseButton />
                <ModalBody className="max-h-96 overflow-y-auto">
                    <form onSubmit={UpdateProgressHandler}>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-white">Weight</label>
                            <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <p className="block text-lg my-3 font-semibold text-white" >Your measurements :</p>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-white">Chest</label>
                            <input type="number" required name="chest" value={formData.measurements.chest} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-white">Waist</label>
                            <input type="number" required name="waist" value={formData.measurements.waist} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <p className="block text-lg my-3 font-semibold text-white">Your performance :</p>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-white">Bench Press</label>
                            <input type="number" required name="bench_press" value={formData.performance_data.bench_press} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-white">Squats</label>
                            <input type="number" required name="squats" value={formData.performance_data.squats} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button type="submit" className="w-3/6 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-500 rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700">Update Progress</button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default EditPopup;
