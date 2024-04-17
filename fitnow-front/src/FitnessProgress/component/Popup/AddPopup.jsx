import { useState } from "react";
import Swal from "sweetalert2";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { InsertProgress } from "../../../Api"; 
import Cookies from "js-cookie";

function AddPopup({ onInsertSuccess }) {
    const [formData, setFormData] = useState({
        weight: "",
        measurements: { chest: "", waist: "" },
        performance_data: { bench_press: "", squats: "" },
    });

    const InsertProgressHandler = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("authToken");
            if (!token) {
                throw new Error("No token found");
            }
    
            const measurementsJSON = JSON.stringify(formData.measurements);
            const performanceDataJSON = JSON.stringify(formData.performance_data);
    
            const formDataWithJSON = {
                ...formData,
                measurements: measurementsJSON,
                performance_data: performanceDataJSON,
            };
    
            await InsertProgress(formDataWithJSON, token);
            setFormData({
                weight: "",
                measurements: { chest: "", waist: "" },
                performance_data: { bench_press: "", squats: "" },
            });
    
            if (onInsertSuccess) {
                onInsertSuccess();
            }
    
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Your progress has been successfully recorded.",
            });
        } catch (error) {
            console.error("Error inserting progress:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "An unexpected error occurred.",
            });
        }
    };
    
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
    
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

    return (
        <>
            <Button className="bg-black rounded-lg text-white font-bold py-1 px-2 duration-200 hover:text-yellow-600" onClick={onOpen}>
                Add Progress
            </Button>

            <Modal  isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className="bg-black text-white p-9">
                    <ModalHeader className="font-bold text-2xl">Add Progress</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="max-h-96 overflow-y-auto">
                        <form onSubmit={InsertProgressHandler}>
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
                                <button type="submit" className="w-3/6 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-500 rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700">Add Progress</button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddPopup;
