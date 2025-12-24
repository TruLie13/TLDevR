"use client";

import InputField from "@/components/InputField.js";
import SnackbarComponent from "@/components/Snackbar.js";
import Tiptap from "@/components/TipTap/TipTap.js";
import { fetchAllCategories } from "@/lib/api.js";
import { background } from "@/lib/themeTokens";
import { Card, FormControlLabel, Switch, Typography, Box, Button } from "@mui/material";
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

  // Helper to normalize values for comparison
  const normalize = (val) => (val === null || val === undefined ? "" : val);

  // Helper to normalize HTML for comparison (ignores newlines and attribute order differences roughly)
  const normalizeHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/\n/g, "") // Remove newlines
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/ class="my-custom-ordered-list"/g, "") // Ignore specific Tiptap class
      .replace(/<ol>/g, "") // Ignore ol tag structure diffs for now (simplified)
      .replace(/<\/ol>/g, "")
      .replace(/ target="_blank"/g, "") // Ignore target attr order
      .replace(/ rel="noopener noreferrer"/g, "") // Ignore rel attr order
      .replace(/ href="/g, 'href="') // Normalize spacing
      .trim();
  };

  // Check if there are any changes (for edit mode)
  const checkHasChanges = () => {
    const current = getCurrentData();
    
    // Check simple fields
    const simpleFields = [
      "title", "author", "metaDescription", 
      "image", "status", "experienceLevel"
    ];

    for (const key of simpleFields) {
      let initialValue = initialData[key];
      if (key === "experienceLevel") initialValue = initialData.experienceLevel?.toString() || "0";
      
      if (normalize(current[key]) !== normalize(initialValue)) {
        return true;
      }
    }

    // Check content with implicit normalization
    // Note: We use a stricter check, but if it fails, we assume it might be just formatting
    // If the user saves once, this syncs up. 
    // For now, let's just check if the text content is roughly the same length? No/
    
    // Using the normalizeHtml helper
    if (normalizeHtml(current.content) !== normalizeHtml(initialData.content)) {
       // Only log if truly different after normalization
       console.log("Content diff detected:", {
         current: normalizeHtml(current.content).substring(0, 50) + "...",
         initial: normalizeHtml(initialData.content).substring(0, 50) + "..."
       });
       return true;
    }

    // Check category (special object handling)
    const initialCatId = initialData.category?._id || initialData.category || "";
    if (normalize(current.category) !== normalize(initialCatId)) return true;

    // Check featured (boolean)
    const initialFeatured = initialData.featured || false;
    if (current.featured !== initialFeatured) return true;

    // Check tags (array deep comparison)
    const initialTags = initialData.tags || [];
    if (JSON.stringify(current.tags) !== JSON.stringify(initialTags)) return true;

    return false;
  };


  const hasChanges = isEditMode ? checkHasChanges() : true;

  // Determine if submit should be enabled
  const isSubmitDisabled = !title || !author || !category || !image || !content || (isEditMode && !hasChanges);

  // Get only changed fields (for API submission)
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
      } else if (normalize(currentValue) !== normalize(initialValue)) {
        changed[key] = currentValue;
      }
    });

    return changed;
  };


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
      value: categoryList?.length ? category : "",
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
    <Box sx={{ padding: "0.5rem", marginLeft: "1.25rem", marginRight: "1.25rem" }}>
      {/* Form for article metadata */}
      <form onSubmit={handleSubmit} aria-labelledby="create-article-heading">
        <Card
          sx={{
            padding: "1.25rem",
            backgroundColor: background.paper,
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
      <Button
        type="submit"
        id="submit-article-button"
        variant="contained"
        sx={{
          marginTop: "1.25rem",
          paddingX: "1rem",
          paddingY: "0.5rem",
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          // Explicitly define disabled state styles to override invisible default theme
          "&.Mui-disabled": {
            backgroundColor: "grey.600",
            color: "rgba(255, 255, 255, 0.7)",
            opacity: 0.7,
            cursor: "not-allowed",
          },
        }}
        aria-label="Submit article"
        disabled={isSubmitDisabled || loading}
        onClick={handleSubmit}
      >
        {submitLabel}
      </Button>

      {/* Snackbar Notifications */}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
