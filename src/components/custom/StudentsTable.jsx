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
  const [isLoading, setIsLoading] = useState(false); // Add loading state for Add New Student
  const [isDeleting, setIsDeleting] = useState(false); // Add loading state for Delete

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://student-db-backend.onrender.com/api/students"
        );
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
    setIsLoading(true); // Start loading state for Add Student
    const newStudent = {
      name: "New Student",
      cohort: `AY ${ayFilter}`,
      courses: [
        { name: `${categoryFilter} Science` },
        { name: `${categoryFilter} Math` },
      ],
      dateJoined: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      status: "Active",
      academicYear: ayFilter,
      category: categoryFilter,
    };

    try {
      const response = await fetch(
        "https://student-db-backend.onrender.com/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to add student: ${response.statusText}`);
      }
      const data = await response.json();
      setStudents([...students, data]); // Add new student to the list
    } catch (error) {
      console.error("Error adding new student:", error);
    } finally {
      setIsLoading(false); // Stop loading state for Add Student
    }
  };

  const openDeleteModal = (id) => {
    setStudentToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    setIsDeleting(true); // Start loading state for Delete

    try {
      const response = await fetch(
        `https://student-db-backend.onrender.com/api/students/${studentToDelete}`,
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
    } finally {
      setIsDeleting(false); // Stop loading state for Delete
      setIsModalOpen(false); // Close modal after deletion
      setStudentToDelete(null); // Clear student to delete
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setStudentToDelete(null);
  };

  return (
    <div className="p-4 max-500:w-[300px]">
      <div className="flex justify-between max-500:justify-normal max-500:gap-16 sm-500:justify-normal sm-500:gap-16">
        {/* Filters */}
        <div className="flex space-x-4 max-500:space-x-1 mb-4">
          <select
            className="px-3 py-2 max-500:text-[10px] max-500:py-0 max-500:px-0 font-bold text-[#3F526E] bg-[#E9EDF1] rounded-md"
            value={ayFilter}
            onChange={(e) => setAyFilter(e.target.value)} // Update zustand State
          >
            <option value="2024-25">AY 2024-25</option>
            <option value="2023-24">AY 2023-24</option>
          </select>

          <select
            className="px-3 py-2 max-500:text-[10px] max-500:py-[5.5px] max-500:px-0 font-bold text-[#3F526E] bg-[#E9EDF1] rounded-md"
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
            className={`px-3 py-2 max-500:text-[10px] max-500:py-0 max-500:px-1 flex items-center max-500:space-x-0 space-x-2 justify-center font-bold text-[#3F526E] bg-[#E9EDF1] hover:text-[#E9EDF1] rounded-md hover:bg-[#3F526E] ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading} // Disable the button while loading
          >
            <div>
              <Plus className="w-6 h-6 max-500:w-4 max-500:h-4" />
            </div>
            <span>{isLoading ? "Adding..." : "Add new Student"}</span>
          </button>
        </div>
      </div>

      {/* Display the Table for the selected filters */}
      {filteredStudents.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <div className="overflow-x-auto max-500:overflow-x-scroll">
            <table className="min-w-[600px] max-500:min-w-[800px] m-0 bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b-[1.5px]">
                  <th className="px-0 py-3 text-left font-sans text-[12px] leading-[16.34px]">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] leading-[16.34px]">
                    Cohort
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] leading-[16.34px]">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] leading-[16.34px]">
                    Date Joined
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] leading-[16.34px]">
                    Last Login
                  </th>
                  <th className="ps-6 py-3 text-left text-[12px] leading-[16.34px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="font-sans border-b-[1.5px] font-400 text-[12px] leading-[16.34px]"
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
                        className="w-5 h-5 text-red-500 cursor-pointer"
                        onClick={() => openDeleteModal(student.id)}
                        disabled={isDeleting}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center">No students found</p>
      )}

      {/* Delete confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-[300px]  max-500:w-[250px]">
            <h3 className="font-semibold text-lg">
              Are you sure you want to delete this student?
            </h3>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                disabled={isDeleting} // Disable the button during deletion
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
