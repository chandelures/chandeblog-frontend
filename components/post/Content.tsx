import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";
import { Divider, Typography, Box, Link } from "@mui/material";

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
    <Box>
      <Typography variant="h4" color="text.primary" sx={{ fontWeight: 600 }}>
        {post.title}
      </Typography>
      <CreateDate dateStr={post.created} />
      <Divider sx={{ my: 3 }} />
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node, level, ...props }) => (
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: 600, my: 2 }}
              gutterBottom
              {...props}
            ></Typography>
          ),
          h2: ({ node, level, ...props }) => (
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: 600, my: 2 }}
              gutterBottom
              {...props}
            ></Typography>
          ),
          h3: ({ node, level, ...props }) => (
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 600, my: 2 }}
              gutterBottom
              {...props}
            ></Typography>
          ),
          h4: ({ node, level, ...props }) => (
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ fontWeight: 600, my: 2 }}
              gutterBottom
              {...props}
            ></Typography>
          ),
          h5: ({ node, level, ...props }) => (
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ fontWeight: 600, my: 2 }}
              gutterBottom
              {...props}
            ></Typography>
          ),
          h6: ({ node, level, ...props }) => (
            <Typography
              variant="subtitle2"
              color="text.primary"
              gutterBottom
              sx={{ my: 2 }}
              {...props}
            ></Typography>
          ),
          p: ({ node, ...props }) => (
            <Typography
              component="p"
              variant="body1"
              color="text.primary"
              gutterBottom
              sx={{ my: 1 }}
              {...props}
            ></Typography>
          ),
          a: ({ node, ...props }) => (
            <Link variant="body1" color="text.primary" {...props}></Link>
          ),
          blockquote: ({ node, ...props }) => (
            <Typography
              component="blockquote"
              variant="body1"
              sx={{ ml: 3, fontStyle: "italic" }}
              {...props}
            ></Typography>
          ),
          li: ({ node, index, ordered, ...props }) => (
            <Typography
              component="li"
              variant="body1"
              color="text.primary"
              {...props}
            ></Typography>
          ),
          hr: ({ node, ...props }) => <Divider {...props} />,
          div: ({ node, ...props }) => (
            <Typography
              component="div"
              variant="body1"
              color="text.primary"
              {...props}
            ></Typography>
          ),
          pre: ({ node, ...props }) => (
            <Typography
              component="pre"
              variant="body2"
              color="text.primary"
              gutterBottom
              sx={{
                lineHeight: 1.2,
                fontFamily: "monospace",
                fontSize: 15,
                my: 2,
                py: 0.5,
                overflow: "auto",
              }}
              {...props}
            ></Typography>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </Box>
  );
}
