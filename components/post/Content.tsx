import { Divider, Typography } from "@mui/material";

import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("components/general/Markdown"));

import CreateDate from "components/general/CreateDate";

interface ContentProps {
  post: {
    title: string;
    content: string;
    created: string;
  };
}

export default function Content(props: ContentProps) {
  const { post } = props;
  return (
    <>
      <Typography variant="h1" color="text.primary" sx={{ fontWeight: 600 }}>
        {post.title}
      </Typography>
      <CreateDate dateStr={post.created} />
      <Divider sx={{ my: 3 }} />
      <Markdown>{post.content}</Markdown>
    </>
  );
}
