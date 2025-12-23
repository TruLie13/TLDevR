"use client";

import InputField from "@/components/InputField.js";
import SnackbarComponent from "@/components/Snackbar.js";
import Tiptap from "@/components/TipTap/TipTap.js";
import { fetchAllCategories } from "@/lib/api.js";
import { Card, FormControlLabel, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ArticleForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit Article",
  title: formTitle = "Create Article",
  isEditMode = false,
}) {
  // State for each form field - initialize from initialData if provided
  const [title, setTitle] = useState(initialData.title || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [category, setCategory] = useState(initialData.category?._id || initialData.category || "");
  const [categoryList, setCategoryList] = useState([]);
  const [tags, setTags] = useState(initialData.tags || []);
  const [metaDescription, setMetaDescription] = useState(initialData.metaDescription || "");
  const [image, setImage] = useState(initialData.image || "");
  const [status, setStatus] = useState(initialData.status || "draft");
  const [featured, setFeatured] = useState(initialData.featured || false);
  const [experienceLevel, setExperienceLevel] = useState(
    initialData.experienceLevel?.toString() || "0"
  );
  const [content, setContent] = useState(initialData.content || "");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories();
        setCategoryList(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    loadCategories();
  }, []);

  // Get current form state for comparison
  const getCurrentData = () => ({
    title,
    slug,
    author,
    category,
    tags,
    content,
    metaDescription,
    image,
    status,
    featured,
    experienceLevel,
  });

  // Get only changed fields (for edit mode)
  const getChangedFields = () => {
    const current = getCurrentData();
    const changed = {};
    
    Object.keys(current).forEach((key) => {
      const initialValue = key === "category" 
        ? (initialData.category?._id || initialData.category || "")
        : key === "experienceLevel"
        ? (initialData.experienceLevel?.toString() || "0")
        : (initialData[key] || (key === "tags" ? [] : key === "featured" ? false : ""));
      
      const currentValue = current[key];
      
      // Deep compare for arrays (tags)
      if (Array.isArray(currentValue)) {
        if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
          changed[key] = currentValue;
        }
      } else if (currentValue !== initialValue) {
        changed[key] = currentValue;
      }
    });
    
    return changed;
  };

  // Check if there are any changes (for edit mode)
  const hasChanges = isEditMode ? Object.keys(getChangedFields()).length > 0 : true;

  // Determine if submit should be enabled
  const isSubmitDisabled = !title || !author || !category || !image || !content || (isEditMode && !hasChanges);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // For edit mode, only send changed fields; for create, send everything
    const articleData = isEditMode ? getChangedFields() : {
      title,
      slug,
      author,
      category,
      tags,
      content,
      metaDescription,
      image,
      status,
      featured,
      experienceLevel,
    };

    try {
      await onSubmit(articleData);
      setSnackbar({
        open: true,
        message: "Article saved successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to save article. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fields configuration
  const fields = [
    {
      id: "author",
      label: "Author",
      value: author,
      onChange: setAuthor,
      type: "dropdown",
      options: [{ label: "Zayan", value: "Jonathan Zayan" }],
    },
    {
      id: "title",
      label: "Title",
      value: title,
      onChange: setTitle,
      type: "text",
      maxCount: 60,
    },
    // { id: "slug", label: "Slug", value: slug, onChange: setSlug, type: "text" },
    {
      id: "category",
      label: "Category",
      value: category,
      onChange: setCategory,
      type: "dropdown",
      options: categoryList?.length
        ? categoryList?.map((cat) => ({ label: cat.name, value: cat._id }))
        : [],
    },
    {
      id: "experienceLevel",
      label: "Experience Level",
      value: experienceLevel,
      onChange: setExperienceLevel,
      type: "dropdown",
      options: [
        { label: "Beginner", value: "0" },
        { label: "Intermediate", value: "1" },
        { label: "Advanced", value: "2" },
        { label: "Expert", value: "3" },
        { label: "Master", value: "4" },
      ],
    },
    {
      id: "metaDescription",
      label: "Meta Description",
      value: metaDescription,
      onChange: setMetaDescription,
      type: "text",
      maxCount: 160,
    },
    {
      id: "tags",
      label: "Tags",
      value: tags, // Pass the tags array directly
      onChange: setTags, // Pass the setTags function directly
      type: "tags", // Use the new "tags" type
      maxTags: 6,
    },
    {
      id: "imageUrl",
      label: "Image URL",
      value: image,
      onChange: setImage,
      type: "text",
    },
  ];

  return (
    <div className="p-2 ml-5 mr-5">
      {/* Form for article metadata */}
      <form onSubmit={handleSubmit} aria-labelledby="create-article-heading">
        <Card
          className="p-5"
          sx={{
            backgroundColor: "rgb(21, 18, 43)",
            width: "100%",
            color: "white",
            borderRadius: "1.5rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", marginBottom: "1.5rem" }}
            id="create-article-heading"
          >
            {formTitle}
          </Typography>

          {/* Dynamic Fields */}
          {fields.map((field, index) => (
            <InputField
              key={index}
              id={field.id}
              name={field.id}
              label={field.label}
              value={field.value}
              onChange={field.onChange}
              maxCount={field.maxCount}
              type={field.type}
              maxTags={field.maxTags}
              options={field.options}
              disabled={field.disabled}
              aria-required={true}
            />
          ))}

          {/* Status Toggle */}
          <FormControlLabel
            control={
              <Switch
                id="status-toggle"
                name="status"
                checked={status === "published"}
                onChange={() =>
                  setStatus(status === "draft" ? "published" : "draft")
                }
                inputProps={{ "aria-label": "Publishing status" }}
              />
            }
            label={<Typography component="span">Published</Typography>}
            labelPlacement="end"
            sx={{ color: "white" }}
          />

          {/* Featured Toggle */}
          <FormControlLabel
            control={
              <Switch
                id="featured-toggle"
                name="featured"
                checked={featured}
                onChange={() => setFeatured(!featured)}
                inputProps={{ "aria-label": "Featured article" }}
              />
            }
            label="Featured"
            sx={{ color: "white" }}
          />
        </Card>
      </form>

      {/* Content Input*/}
      <Tiptap
        onChange={(value) => setContent(value)}
        initialContent={initialData.content || ""}
        aria-label="Article content editor"
      />

      {/* Submit Button */}
      <button
        type="submit"
        id="submit-article-button"
        className={`mt-5 px-4 py-2 rounded ${
          isSubmitDisabled || loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        aria-label="Submit article"
        disabled={isSubmitDisabled || loading}
        onClick={handleSubmit} // Manually handle form submission
      >
        {submitLabel}
      </button>

      {/* Snackbar Notifications */}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}
