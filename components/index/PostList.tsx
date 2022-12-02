import { Box, Link, Typography } from "@mui/material";
import CreateDate from "components/general/CreateDate";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return monthNames[month] + " " + day + ", " + year;
};

interface PostListProps {
  posts: ReadonlyArray<{
    title: string;
    description: string;
    created: string;
    slug: string;
  }>;
}

export default function PostList(props: PostListProps) {
  const { posts } = props;
  return (
    <>
      {posts.map((post) => (
        <Box key={post.title} sx={{ mb: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Link
              color="inherit"
              underline="hover"
              variant="h4"
              sx={{ fontWeight: 600, color: "text.primary" }}
              href={`/posts/${post.slug}`}
            >
              {post.title}
            </Link>
            <CreateDate dateStr={post.created} />
          </Box>
          <Typography variant="body1" color="text.primary">
            {post.description}
          </Typography>
        </Box>
      ))}
    </>
  );
}
