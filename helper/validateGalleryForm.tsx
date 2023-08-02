export const validate = (values: any) => {
    const errors: any = {};
    console.log()
    if (!values["title"]) {
      errors["title"] = "Title is required";
    }
  
    if (!values["category"]) {
        errors["category"] = "Category is required";
      }
    
    if (!values["imageUrl"]) {
      errors["imageUrl"] = "imageUrl is required";
    }
    if (!values["description"]) {
      errors["description"] = "Description is required";
    }
  
    return errors;
  };