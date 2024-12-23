import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore"; // Importing useStore from Zustand store
import course1 from "../../assets/course1_placeholder.png";
import course2 from "../../assets/course2_placeholder.png";
import { Plus } from "lucide-react";
import { MdDelete } from "react-icons/md";

const StudentsTable = () => {
  // Accessing the global state and actions from Zustand
  const {
    students,
    ayFilter,
    categoryFilter,
    setAyFilter,
    setCategoryFilter,
    setStudents,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students"); // Assuming this is your API endpoint
        const data = await response.json();
        setStudents(data); // Set fetched students to the global store
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [setStudents]);

  // Filter students based on the selected academic year and category
  const filteredStudents = students.filter((student) => {
    return (
      (ayFilter === "" || student.academicYear === ayFilter) &&
      (categoryFilter === "" || student.category === categoryFilter)
    );
  });

  const handleAddNewStudent = async () => {
    const newStudent = {
      name: "New Student",
      cohort: `AY ${ayFilter}`,
      courses: [
        { name: `${categoryFilter} Science` },
        { name: `${categoryFilter} Math` },
      ],
      dateJoined: new Date().toISOString(), // Format to ISO 8601
      lastLogin: new Date().toISOString(), // Format to ISO 8601
      status: "Active",
      academicYear: ayFilter,
      category: categoryFilter,
    };

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) {
        throw new Error(`Failed to add student: ${response.statusText}`);
      }
      const data = await response.json();
      setStudents([...students, data]); // Add new student to the list
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      console.error("Error adding new student:", error);
    }
  };

  const openDeleteModal = (id) => {
    setStudentToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${studentToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setStudents(
          students.filter((student) => student.id !== studentToDelete)
        );
        console.log("Student deleted successfully!");
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }

    setIsModalOpen(false);
    setStudentToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setStudentToDelete(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        {/* Filters */}
        <div className="flex space-x-4 mb-4">
          <select
            className="px-3 py-2 font-bold text-[#3F526E] bg-[#E9EDF1] rounded-md"
            value={ayFilter}
            onChange={(e) => setAyFilter(e.target.value)} // Update zustand State
          >
            <option value="2024-25">AY 2024-25</option>
            <option value="2023-24">AY 2023-24</option>
          </select>

          <select
            className="px-3 py-2 font-bold text-[#3F526E] bg-[#E9EDF1] rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)} // Update zustand State
          >
            <option value="CBSE 9">CBSE 9</option>
            <option value="CBSE 10">CBSE 10</option>
          </select>
        </div>
        <div>
          {/* Add New Student Button */}
          <button
            onClick={handleAddNewStudent} // Calls the dynamic student addition function
            className="px-3 py-2 flex items-center space-x-2 justify-center font-bold text-[#3F526E] bg-[#E9EDF1] hover:text-[#E9EDF1] rounded-md hover:bg-[#3F526E]"
          >
            <div>
              <Plus className="w-6 h-6" />
            </div>
            <span>Add new Student</span>
          </button>
        </div>
      </div>

      {/* Display the Table for the selected filters */}
      {filteredStudents.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full m-0 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b-[1.5px]">
                <th className="px-0 py-3 text-left font-sans text-[12px] leading-[16.34px]">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left  text-[12px] leading-[16.34px]">
                  Cohort
                </th>
                <th className="px-6 py-3 text-left  text-[12px] leading-[16.34px]">
                  Courses
                </th>
                <th className="px-6 py-3 text-left  text-[12px] leading-[16.34px]">
                  Date Joined
                </th>
                <th className="px-6 py-3 text-left  text-[12px] leading-[16.34px]">
                  Last Login
                </th>
                <th className="ps-6  py-3 text-left  text-[12px] leading-[16.34px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  className="font-sans border-b-[1.5px] font-400 text-[12px] leading-[16.34px]"
                  key={index}
                >
                  <td className="px-0 py-2">{student.name}</td>
                  <td className="px-5 py-2">{student.cohort}</td>
                  <td className="px-5 py-2">
                    <div className="flex flex-wrap gap-2">
                      {student.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 bg-gray-100 px-1 py-[2px] rounded-sm"
                        >
                          {/* Display different icons for first and second courses */}
                          {idx === 0 && (
                            <img
                              className="h-5 w-5 rounded-sm"
                              src={course1}
                              alt="Course"
                            />
                          )}
                          {idx === 1 && (
                            <img
                              className="h-5 w-5 rounded-sm"
                              src={course2}
                              alt="Course"
                            />
                          )}
                          <span className="font-sans font-medium text-[12px] leading-[16.34px]">
                            {course.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-2">{student.dateJoined}</td>
                  <td className="px-5 py-2">{student.lastLogin}</td>
                  <td className="ps-8 py-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        student.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                  </td>
                  <td className="px-6 py-2">
                    <MdDelete
                      className="w-5 h-5 text-red-500 p-0 m-0"
                      onClick={() => openDeleteModal(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-4">
          No students found for the selected filters.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this student?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
