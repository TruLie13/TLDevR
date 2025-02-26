"use client";

import React, { useState, useEffect } from "react";
import Tiptap from "@/components/TipTap/TipTap.js";
import {
  Card,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
  IconButton,
} from "@mui/material";
import InputField from "@/components/InputField.js";
import { postArticle } from "@/lib/api.js";
import SnackbarComponent from "@/components/Snackbar.js";
import { fetchAllCategories } from "@/lib/api.js";

export default function CreateArticle() {
  // State for each form field
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [tags, setTags] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("0");
  const [content, setContent] = useState("");
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

  // Determine if submit should be enabled (all required fields must be filled)
  const isSubmitDisabled = !title || !author || !category || !image || !content;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const articleData = {
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
      await postArticle(articleData); // Remove res = since we don't need it
      setSnackbar({
        open: true,
        message: "Article submitted successfully!",
        severity: "success",
      });

      // Clear form fields after success
      setTitle("");
      setSlug("");
      setAuthor("");
      setCategory("");
      setCategoryList([]);
      setTags([]);
      setMetaDescription("");
      setImage("");
      setStatus("draft");
      setFeatured(false);
      setExperienceLevel("0");
      setContent("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to submit article. Please try again.",
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
      options: [{ label: "Zayan", value: "Zayan" }],
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
            Create Article
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
        Submit Article
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
