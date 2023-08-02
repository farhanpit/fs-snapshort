import { useState } from "react";
import classes from "./gallery-form.module.css";
import Category from "@/helper/category";
import { validate } from "@/helper/validateGalleryForm";
import { IGalleryPost } from "@/helper/types/GalleryRecord";
import { addDataToIndexedDB } from "../../helper/indexedDB";

function GallaryForm() {
  const initialValues: IGalleryPost = {
    title: "",
    category: "",
    description: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [message, setMessage] = useState<string>();

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [apiError, setApiError] = useState<string>();

  const handelSubmit = async (e: any) => {
    e.preventDefault();

    setErrors(validate(formData));
    if (
      formData.title === "" ||
      formData.category === "Select" ||
      formData.imageUrl === "" ||
      formData.description === "" ||
      Object.keys(validate(formData)).length > 0
    ) {
      return;
    } else {
      try {
        const response = await fetch("/api/gallerys", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          setFormData(initialValues);
        }
      } catch (error) {
        const res = await addDataToIndexedDB(formData);
        if (res) {
          setMessage("Record insert Successfully! ");
          setFormData(initialValues);
          // Handle the exception here
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  return (
    <section className={classes.contact}>
      <h1>Add Gallary</h1>
      <form className={classes.form} onSubmit={handelSubmit}>
        <div>
          {<span className={classes.success}>{message}</span>}
          {<span className={classes.apierror}>{apiError}</span>}
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <span className={classes.error}>{errors.title}</span>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Select</option>
            {Category.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className={classes.error}>{errors.category}</span>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="imageUrl">ImageUrl</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <span className={classes.error}>{errors.imageUrl}</span>
          )}
        </div>

        <div className={classes.control}>
          <label htmlFor="Description">Your Message</label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <span className={classes.error}>{errors.description}</span>
          )}
        </div>

        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
}

export default GallaryForm;
