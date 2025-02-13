"use client";

import React, { useState, useEffect } from "react";
import Tiptap from "@/components/TipTap/TipTap.js";
import { Card, Typography, FormControlLabel, Switch } from "@mui/material";
import InputField from "@/components/TipTap/InputField.js";
import { postArticle } from "@/lib/api.js";

export default function CreateArticle() {
  // State for each form field
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("0");
  const [content, setContent] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      slug,
      author, // Ensure this is included
      category,
      tags,
      content: "", // You'll need to extract TipTap content
      metaDescription,
      image,
      status,
      featured,
      experienceLevel,
      content,
    };

    try {
      const response = await postArticle(articleData);
      console.log("Article created:", response);
    } catch (error) {
      console.error("Failed to submit article:", error);
    }
  };

  // Fields configuration
  const fields = [
    { label: "Title", value: title, onChange: setTitle, type: "text" },
    { label: "Slug", value: slug, onChange: setSlug, type: "text" },
    {
      label: "Author",
      value: author,
      onChange: setAuthor,
      type: "dropdown",
      options: [{ label: "Zayan", value: "Zayan" }],
    },
    {
      label: "Category",
      value: category,
      onChange: setCategory,
      type: "dropdown",
      options: [
        { label: "Tech", value: "tech" },
        { label: "Lifestyle", value: "lifestyle" },
        { label: "Education", value: "education" },
      ],
    },
    {
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
      label: "Meta Description",
      value: metaDescription,
      onChange: setMetaDescription,
      type: "text",
    },
    { label: "Image URL", value: image, onChange: setImage, type: "text" },
  ];

  return (
    <div className="p-2 ml-5 mr-5">
      <Card
        className="p-5"
        sx={{
          backgroundColor: "rgb(21, 18, 43)",
          width: "100%",
          color: "white",
          borderRadius: "1.5rem",
        }}
      >
        <Typography variant="h6" className="mb-5" sx={{ color: "white" }}>
          Create Article
        </Typography>

        {/* Map over fields to render dynamically */}
        {fields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            type={field.type}
            options={field.options}
            disabled={field.disabled}
          />
        ))}

        {/* Status Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={status === "published"}
              onChange={() =>
                setStatus(status === "draft" ? "published" : "draft")
              }
            />
          }
          label="Published"
          sx={{ color: "white" }}
        />

        {/* Featured Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={featured}
              onChange={() => setFeatured(!featured)}
            />
          }
          label="Featured"
          sx={{ color: "white" }}
        />

        {/* TipTap Editor */}
      </Card>
      <br></br>
      <Tiptap onChange={(value) => setContent(value)} />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Article
      </button>
    </div>
  );
}
