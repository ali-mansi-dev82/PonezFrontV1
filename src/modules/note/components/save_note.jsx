import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SaveNoteFn } from "../mutation";
import { TextField } from "@mui/material";
import { getNoteFn } from "../query";

const SaveNote = ({ id }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    if (id)
      getNoteQuery.mutateAsync(id, {
        onSuccess: (data) => {
          if (data?.content) setContent(data.content);
          console.log(data);
        },
      });
  }, [id]);

  const saveNoteMutation = useMutation({
    mutationFn: SaveNoteFn,
  });

  const getNoteQuery = useMutation({
    mutationFn: getNoteFn.bind(id),
  });

  const handleChange = (e) => {
    const content = e.target.value;
    
    saveNoteMutation.mutateAsync(
      { id, content },
      { onSuccess: (data) => setContent(data.content) }
    );
  };
  return (
    <TextField
    id="outlined-multiline-static"
    placeholder="یادداشت"
    multiline
    rows={4}
    onChange={handleChange}
    sx={{ width: "100%" }}
    defaultValue={content}
  />
  );
};

export default SaveNote;
