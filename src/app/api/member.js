export const memberDelete = (id) => {
  if (confirm("Are you sure you want to delete?")) {
    console.log("member deleted!");
  } else {
    console.log("member was not deleted!");
  }
};

export const memberUpdate = (id, data) => {};
