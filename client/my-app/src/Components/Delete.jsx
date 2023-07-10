import React, { useEffect } from "react";

const Delete = () => {
  const handleDelete = async () => {
    // localStorage.setItem("deleteID",JSON.stringify(row._id))
    // let idToBeDeleted = row._id;

    const idToBeDeleted = localStorage.getItem("deleteID");

    try {
      let response = await fetch(`http://localhost:8080/users/${idToBeDeleted}`);
      response = await response.json();
      console.log("Deleted " + response);
      localStorage.removeItem("deleteID");
    } catch (error) {
      console.log("User Deletion Failed");
    }
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return <div>Delete</div>;
};

export default Delete;
